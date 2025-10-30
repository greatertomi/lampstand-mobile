# Font Fix Testing Guide

## What Was Fixed

### 1. ✅ Preview Card Font Display

- Preview now shows actual selected font
- All fonts loaded and mapped correctly in React Native

### 2. ✅ Font Persistence

- Custom settings now properly saved to AsyncStorage
- Preset saved along with custom settings
- Settings persist across app restarts

### 3. ✅ Font Loading

- All 7 fonts loaded in `App.tsx`
- Fonts available in both preview and WebView
- Font files correctly mapped

## Rebuild Required

**IMPORTANT**: You must completely rebuild the app for fonts to load:

```bash
# Stop Metro bundler (Ctrl+C)

# Clear all caches
npx react-native start --reset-cache

# In another terminal, rebuild
npx react-native run-android
```

## Testing Steps

### Test 1: Font Preview in Customize Screen

1. Open any book
2. Go to Settings → Customize Theme
3. **Check the preview card at top**
   - Should show default font (Plus Jakarta Sans)
4. Click on "Font" option
5. Select different fonts one by one
6. **Expected**: Preview card text changes to show each font

**✅ Pass**: Preview shows different fonts
**❌ Fail**: Preview looks same for all fonts → Font not loaded properly

### Test 2: Font in Font Selection Modal

1. Open Settings → Customize Theme
2. Tap "Font" to open font modal
3. **Expected**: Each font name displayed in its own typeface
   - "Plus sans jakarata" in Plus Jakarta Sans
   - "Poetsen One" in Poetsen One
   - "Purple Purse" in Purple Purse
   - etc.

**✅ Pass**: Each font visually different
**❌ Fail**: All look same → Check App.tsx font loading

### Test 3: Font Persistence

1. Open Settings → Customize Theme
2. Change font to "Poetsen One"
3. Change line spacing to 50
4. Press **Apply**
5. Close the app completely
6. Reopen the app
7. Open the same book
8. **Expected**: Book still shows Poetsen One font with increased line spacing

**✅ Pass**: Settings retained
**❌ Fail**: Reverted to default → Check AsyncStorage

### Test 4: Font in Reader

1. Open Settings → Customize Theme
2. Select "Seymour One" font
3. Press Apply
4. **Expected**: Book text immediately changes to Seymour One
5. Try other fonts
6. **Expected**: Each font visually distinct in reader

**✅ Pass**: Fonts change in reader
**❌ Fail**: Reader font doesn't change → Check WebView injection

## Expected Font Appearances

### Plus Jakarta Sans (Default)

- Clean, modern sans-serif
- Medium weight
- Good readability

### Poetsen One

- Playful, rounded
- Display font style
- Fun, informal look

### Purple Purse

- Handwritten, casual
- Cursive style
- Personal, friendly

### Cabinet Grotesk

- Neo-grotesque sans
- Clean, professional
- Modern geometric

### Seymour One

- Bold slab serif
- Strong, impactful
- Vintage feel

### Bogart

- Condensed, tall
- Bold and striking
- Art deco inspired

### Port Lligat Slab

- Elegant slab serif
- Literary feel
- Classic book style

## Common Issues & Solutions

### Issue 1: Preview doesn't show font changes

**Solution**:

1. Check that fonts are loaded in `App.tsx` (lines 46-51)
2. Verify font files exist in `assets/fonts/`
3. Rebuild app completely
4. Check `enhanced-theme.ts` has correct font mapping

### Issue 2: Settings don't persist

**Solution**:

1. Check AsyncStorage permissions
2. Look for errors in console when pressing Apply
3. Verify `updateSettings` is called in `applyCustomizations`
4. Check `useCustomTheme` hook is loading settings on mount

### Issue 3: WebView doesn't show fonts

**Solution**:

1. Check internet connection (Google Fonts CDN)
2. Wait 2-3 seconds for CDN download
3. Check console for font loading errors
4. Verify `reader-theme.ts` has correct Google Fonts URL

### Issue 4: Fonts look same in modal

**Solution**:

1. Fonts must be loaded in `App.tsx` with `useFonts()`
2. Font names must match exactly
3. Rebuild app after adding fonts
4. Check font files are valid .ttf files

## Verification Checklist

### After Rebuild:

- [ ] App starts without errors
- [ ] Can open a book successfully
- [ ] Can access Customize Theme screen
- [ ] Preview card shows default font
- [ ] Font modal opens
- [ ] Font names show in their typeface

### Font Preview Tests:

- [ ] Select Poetsen One → Preview changes
- [ ] Select Purple Purse → Preview changes
- [ ] Select Cabinet Grotesk → Preview changes
- [ ] Select Seymour One → Preview changes
- [ ] Select Bogart → Preview changes
- [ ] Select Port Lligat Slab → Preview changes
- [ ] Back to Plus Jakarta Sans → Preview changes

### Reader Tests:

- [ ] Apply Poetsen One → Reader updates
- [ ] Close and reopen book → Font persists
- [ ] Apply different spacing → Spacing persists
- [ ] Restart app → Settings persist

### Persistence Tests:

- [ ] Apply font + spacing
- [ ] Navigate away from book
- [ ] Return to book → Settings retained
- [ ] Close app
- [ ] Reopen app → Settings retained
- [ ] Open different book → New book uses defaults
- [ ] Return to first book → First book keeps custom settings

## Success Criteria

✅ **Complete Success**:

- All 7 fonts show correctly in preview
- All fonts show in their typeface in modal
- Font changes apply immediately to reader
- Settings persist after closing app
- Each book remembers its own settings

## Still Having Issues?

1. **Clear all app data**:
   - Settings → Apps → Lampstand → Clear Data
2. **Check font files**:

   ```bash
   Get-ChildItem -Path "assets/fonts" -Filter "*.ttf"
   ```

   Should show all 7 font files

3. **Check console logs**:
   - Open Chrome DevTools
   - Look for font loading errors
   - Look for AsyncStorage errors

4. **Verify code changes**:
   - `App.tsx` lines 46-51 uncommented
   - `enhanced-theme.ts` has FONT_FAMILY_PREVIEW_MAP
   - `CustomizeThemeScreen.tsx` calls updateSettings
   - `FontSelectionModal.tsx` uses font.value for fontFamily

## Files Modified

1. ✅ `App.tsx` - Font loading
2. ✅ `enhanced-theme.ts` - Preview font mapping
3. ✅ `CustomizeThemeScreen.tsx` - Persistence fix
4. ✅ `FontSelectionModal.tsx` - Font preview in modal

All changes are minimal and focused on fixing the two specific issues.
