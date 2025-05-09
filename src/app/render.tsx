import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { EngineView, useEngine } from "@babylonjs/react-native";
import {
  ArcRotateCamera,
  Camera,
  Scene,
  SceneLoader,
  Color4,
  AnimationGroup,
  Nullable,
  HemisphericLight,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

function Render(): React.JSX.Element {
  const engine = useEngine();
  const [scene, setScene] = useState<Scene>();
  const [camera, setCamera] = useState<Camera>();
  const [currentAnimation, setCurrentAnimation] =
    useState<Nullable<AnimationGroup>>(null);

  // const basicGLTFURL = "https://raw.githubusercontent.com/thechaudharysab/babylonjspoc/main/src/assets/Client.gltf";

  const basicGLTFURL =
    "https://raw.githubusercontent.com/thechaudharysab/babylonjspoc/main/src/assets/Horse.gltf";

  // const basicGLTFURL = require("../assets/Cow.glb");
  // const basicGLTFURL = require("../assets/Horse.glb");
  // const basicGLTFURL = require("../assets/Llama.glb")
  // const basicGLTFURL = require("../assets/Pig.glb")
  // const basicGLTFURL = require("../assets/Pug.glb")
  // const basicGLTFURL = require("../assets/Sheep.glb")
  // const basicGLTFURL = require("../assets/Zebra.glb")

  const renderbasicGLTF = () => {
    if (!engine) {
      console.log("Engine not ready for loading GLTF");
      return;
    }
    SceneLoader.LoadAsync("", basicGLTFURL, engine)
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
          console.log("Error: SceneLoader.LoadAsync returned a null scene.");
        }
      })
      .catch((error) => {
        console.log("Error loading scene: ", error);
        if (
          error.message &&
          error.message.includes("Unable to find a plugin")
        ) {
          console.error(
            "This might mean the GLTF loader isn't registered or the file type is not recognized. Ensure '@babylonjs/loaders/glTF' is imported."
          );
        }
      });
  };

  useEffect(() => {
    if (engine) {
      renderbasicGLTF();
    }
  }, [engine]);

  const startWalkAnimation = () => {
    if (scene) {
      const walkAnimation = scene.getAnimationGroupByName("Walk");
      if (walkAnimation) {
        if (currentAnimation) {
          currentAnimation.stop();
        }
        walkAnimation?.play(true);
        setCurrentAnimation(walkAnimation);
      } else {
        console.warn("Animation not found:", walkAnimation);
      }
    }
  };

  const stopWalkAnimation = () => {
    if (scene) {
      const idleAnimation = scene.getAnimationGroupByName("Idle");
      if (idleAnimation) {
        if (currentAnimation) {
          currentAnimation.stop();
        }
        idleAnimation.play(true);
        setCurrentAnimation(idleAnimation);
      } else {
        console.warn("Animation not found:", idleAnimation);
      }
    }
  };

  const doJumpAnimation = () => {
    if (scene) {
      var jumpAnimation = scene.getAnimationGroupByName("Jump_toIdle");
      if (jumpAnimation) {
        jumpAnimation.play();
      } else {
        console.warn("Animation not found:", jumpAnimation);
      }
    }
  };

  const randomizeBGColor = () => {
    if (scene) {
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);
      const randomColor = new Color4(red / 255, green / 255, blue / 255, 1.0);

      scene.clearColor = randomColor;
    }
  };

  return (
    <View style={styles.container}>
      <EngineView camera={camera} displayFrameRate={true} />
      <View style={styles.absoluteView}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={startWalkAnimation}
        >
          <Text>Start Walking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={stopWalkAnimation}
        >
          <Text>Stop Walking</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={doJumpAnimation}
        >
          <Text>Jump</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={randomizeBGColor}
        >
          <Text>Random BG Color</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absoluteView: {
    position: "absolute",
    bottom: "10%",
    width: "90%", // Give it some width
    flexDirection: "row",
    justifyContent: "space-around", // Distribute buttons
    alignItems: "center",
    alignSelf: "center",
  },
  buttonContainer: {
    backgroundColor: "#61dafb",
    borderWidth: 1,
    paddingVertical: 8, // Better padding
    paddingHorizontal: 4,
    marginHorizontal: 2, // Add some space between buttons
  },
});
export default Render;
