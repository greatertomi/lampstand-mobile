/**
 * Android-optimized search helper for epub reader
 * Addresses common Android WebView search issues
 */

export const createAndroidSearchScript = (term: string, sectionId?: string) => `
    (function() {
      try {
        const term = ${JSON.stringify(term)};
        const chapterId = ${JSON.stringify(sectionId)};
        
        // Enhanced WebView detection for Android
        const getWebViewInterface = () => {
          if (typeof window !== 'undefined') {
            if (window.ReactNativeWebView && typeof window.ReactNativeWebView.postMessage === 'function') {
              return window.ReactNativeWebView;
            }
            if (typeof window.postMessage === 'function') {
              return { postMessage: window.postMessage.bind(window) };
            }
          }
          console.error('No WebView interface available');
          return { postMessage: () => {} };
        };
        
        const webViewInterface = getWebViewInterface();
        
        console.log('Android search initiated for:', term);
        
        if (!book || !book.spine || !book.spine.spineItems) {
          console.error('Book structure not available for search');
          webViewInterface.postMessage(JSON.stringify({
            type: 'onSearch',
            results: [],
            totalResults: 0,
            finished: true,
            error: 'Book not loaded properly'
          }));
          return;
        }

        const spineItems = book.spine.spineItems;
        console.log('Searching through', spineItems.length, 'spine items');
        
        let allResults = [];
        let processedItems = 0;
        
        const processItem = (item, index) => {
          return new Promise((resolve) => {
            try {
              console.log('Processing item', index + 1, 'of', spineItems.length);
              
              item.load(book.load.bind(book))
                .then(() => {
                  try {
                    let results = [];
                    
                    // Use more robust search method
                    if (typeof item.find === 'function') {
                      results = item.find(term.trim()) || [];
                    }
                    
                    console.log('Found', results.length, 'results in item', index);
                    
                    const locationHref = item.href;
                    let match = null;
                    
                    // Safer TOC processing
                    try {
                      if (book.navigation && book.navigation.toc && typeof flatten === 'function') {
                        const flatToc = flatten(book.navigation.toc) || [];
                        match = flatToc.find((chapter) => {
                          try {
                            const canonicalHref = book.canonical ? book.canonical(chapter.href) : chapter.href;
                            return canonicalHref.includes(locationHref);
                          } catch (e) {
                            console.warn('Error processing chapter href:', e);
                            return false;
                          }
                        });
                      }
                    } catch (tocError) {
                      console.warn('TOC processing error:', tocError);
                    }

                    if (results.length > 0) {
                      results = results.map((result, resultIndex) => ({
                        ...result,
                        id: index + '-' + resultIndex,
                        section: match ? {
                          ...match,
                          index: book.navigation.toc.findIndex(elem => elem.id === match.id)
                        } : { 
                          label: 'Chapter ' + (index + 1), 
                          href: locationHref, 
                          index: index 
                        }
                      }));

                      if (chapterId) {
                        results = results.filter(result => result.section && result.section.id === chapterId);
                      }
                      
                      allResults = allResults.concat(results);
                    }

                    // Safely unload item
                    try {
                      if (typeof item.unload === 'function') {
                        item.unload();
                      }
                    } catch (unloadError) {
                      console.warn('Error unloading item:', unloadError);
                    }

                    processedItems++;
                    
                    // Send progress update for Android
                    if (results.length > 0) {
                      webViewInterface.postMessage(JSON.stringify({
                        type: 'onSearch',
                        results: allResults,
                        totalResults: allResults.length,
                        finished: false,
                        progress: Math.round((processedItems / spineItems.length) * 100)
                      }));
                    }

                    resolve(results);
                  } catch (processingError) {
                    console.error('Error processing search results for item', index, ':', processingError);
                    processedItems++;
                    resolve([]);
                  }
                })
                .catch((loadError) => {
                  console.error('Error loading item', index, 'for search:', loadError);
                  processedItems++;
                  resolve([]);
                });
            } catch (itemError) {
              console.error('Critical error processing item', index, ':', itemError);
              processedItems++;
              resolve([]);
            }
          });
        };

        // Process items sequentially for better Android compatibility
        const processItemsSequentially = async () => {
          for (let i = 0; i < spineItems.length; i++) {
            await processItem(spineItems[i], i);
          }
          
          // Send final results
          console.log('Search completed. Total results:', allResults.length);
          
          webViewInterface.postMessage(JSON.stringify({
            type: 'onSearch',
            results: allResults,
            totalResults: allResults.length,
            finished: true
          }));
        };
        
        processItemsSequentially().catch((sequentialError) => {
          console.error('Sequential processing failed:', sequentialError);
          webViewInterface.postMessage(JSON.stringify({
            type: 'onSearch',
            results: allResults,
            totalResults: allResults.length,
            finished: true,
            error: sequentialError.message
          }));
        });
        
      } catch (criticalError) {
        console.error('Critical search error:', criticalError);
        if (typeof window !== 'undefined' && window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'onSearch',
            results: [],
            totalResults: 0,
            finished: true,
            error: criticalError.message
          }));
        }
      }
    })();
  `;

export const createFallbackSearchScript = (term: string) => `
    (function() {
      try {
        const term = ${JSON.stringify(term)};
        console.log('Fallback search for:', term);
        
        const webViewInterface = window.ReactNativeWebView || { postMessage: () => {} };
        
        // Simple text search fallback
        const documentText = document.body.innerText || document.body.textContent || '';
        const searchResults = [];
        
        if (documentText.toLowerCase().includes(term.toLowerCase())) {
          searchResults.push({
            cfi: 'fallback-cfi',
            excerpt: 'Text found in document (fallback search)',
            section: { label: 'Current Chapter', href: '', index: 0 }
          });
        }
        
        webViewInterface.postMessage(JSON.stringify({
          type: 'onSearch',
          results: searchResults,
          totalResults: searchResults.length,
          finished: true,
          fallback: true
        }));
        
      } catch (error) {
        console.error('Fallback search error:', error);
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'onSearch',
            results: [],
            totalResults: 0,
            finished: true,
            error: error.message,
            fallback: true
          }));
        }
      }
    })();
  `;
