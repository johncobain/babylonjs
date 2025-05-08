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

function Render(): React.JSX.Element {
  const engine = useEngine();
  const [scene, setScene] = useState<Scene>();
  const [camera, setCamera] = useState<Camera>();

  // const basicGLTFURL = "https://raw.githubusercontent.com/thechaudharysab/babylonjspoc/main/src/assets/Client.gltf";

  const basicGLTFURL =
    "https://raw.githubusercontent.com/thechaudharysab/babylonjspoc/main/src/assets/Horse.gltf";

  // const basicGLTFURL = require("../assets/Cow.glb");
  // const basicGLTFURL = require("../assets/Horse.glb")
  // const basicGLTFURL = require("../assets/Llama.glb")
  // const basicGLTFURL = require("../assets/Pig.glb")
  // const basicGLTFURL = require("../assets/Pug.glb")
  // const basicGLTFURL = require("../assets/Sheep.glb")
  // const basicGLTFURL = require("../assets/Zebra.glb")

  const renderbasicGLTF = () => {
    SceneLoader.LoadAsync(basicGLTFURL, undefined, engine)
      .then((loadedScene) => {
        if (loadedScene) {
          setScene(loadedScene);

          loadedScene.createDefaultCameraOrLight(true, undefined, true);
          (loadedScene.activeCamera as ArcRotateCamera).alpha += Math.PI;
          setCamera(loadedScene.activeCamera!);

          const idleAnim = loadedScene.getAnimationGroupByName("Idle");

          if (idleAnim) {
            idleAnim.start(true, 1.0);
          }
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

export default Render;
