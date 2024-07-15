import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert } from "react-native";
import DocumentScanner from "react-native-document-scanner-plugin";

export default () => {
  const [scannedImage, setScannedImage] = useState(null);

  const scanDocument = async () => {
    try {
      // Start the document scanner
      const result = await DocumentScanner.scanDocument();
      console.log(result); // Log the result for debugging

      // Check if result and scannedImages are defined
      if (result && result.scannedImages && result.scannedImages.length > 0) {
        // Set the img src, so we can view the first scanned image
        setScannedImage(result.scannedImages[0]);
      } else {
        Alert.alert("No images scanned", "Please try again.");
      }
    } catch (error) {
      console.error("Document scan failed", error);
      Alert.alert(
        "Error",
        "Document scan failed. Please check the console for more details."
      );
    }
  };

  useEffect(() => {
    // Call scanDocument on load
    scanDocument();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {scannedImage ? (
        <Image
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
          source={{ uri: scannedImage }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Scanning document...</Text>
        </View>
      )}
    </View>
  );
};
