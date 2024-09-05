import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Pdf from "react-native-pdf";

const PdfViewer = ({ fileUri }) => {
  const source = { uri: fileUri, cache: true }; // PDF URL or local path

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pdf: {
    flex: 1,
    width: 500, //Dimensions.get('window').width,
    height: 800, //Dimensions.get('window').height,
  },
});

export default PdfViewer;
