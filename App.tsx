import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { EngineView, useEngine } from "@babylonjs/react-native";
import {
  ArcRotateCamera,
  Camera,
  Scene,
  SceneLoader,
  HemisphericLight,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

function App(): React.JSX.Element {
  const engine = useEngine();
  const [scene, setScene] = useState<Scene>();
  const [camera, setCamera] = useState<Camera>();

  const basicGLTFURL =
    "https://raw.githubusercontent.com/thechaudharysab/babylonjspoc/main/src/assets/Client.gltf";

  //const horseGLTFURL = "https://raw.githubusercontent.com/thechaudharysab/babylonjspoc/main/src/assets/Horse.gltf";

  const renderbasicGLTF = () => {
    SceneLoader.LoadAsync(basicGLTFURL, undefined, engine)
      .then((loadedScene) => {
        if (loadedScene) {
          setScene(loadedScene);

          const light = new HemisphericLight(
            "light",
            new Vector3(0, 1, 0),
            loadedScene
          );
          light.intensity = 0.7;

          const camera = new ArcRotateCamera(
            "camera",
            -Math.PI / 2,
            Math.PI / 2,
            -6,
            new Vector3(0, 2, 0),
            loadedScene,
            true
          );
          camera.attachControl(true);
          setCamera(camera);
        } else {
          console.log("Error loading loadedScene.");
        }
      })
      .catch((error) => {
        console.log("Error loading scene: ", error);
      });
  };

  useEffect(() => {
    if (engine) {
      renderbasicGLTF();
    }
  }, [engine]);

  return (
    <View style={styles.container}>
      <EngineView camera={camera} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
