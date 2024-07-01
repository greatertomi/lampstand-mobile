import React from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import Constants from 'expo-constants';

const content = `
<?xml version='1.0' encoding='utf-8'?>
<html xmlns="http://www.w3.org/1999/xhtml" style="font-size:1.136rem;">
  <head>
    <title>
So Good They Can’t Ignore You</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <link href="../stylesheet.css" type="text/css" rel="stylesheet"/>
<link href="../page_styles.css" type="text/css" rel="stylesheet"/>
</head>
  <body class="calibre1">
<div class="part-box">
<h1 class="part-number" id="calibre_pb_0"><a id="page-1"></a><a href="part0034.html#toc-part001">RULE #1</a></h1>
<p class="orn1"> </p>
</div>
</body></html>
`;

export const Reader = () => <WebView style={styles.container} source={{ html: content }} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  }
});
