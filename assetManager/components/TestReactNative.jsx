import { blue } from "@mui/material/colors";
import axios from "axios";
import React, { Component, Fragment, useEffect, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// const [boardList, setBoardList] = useState([]);

// useEffect(() => {
//   axios({
//     method: "get",
//     url: "/rest/webboard/list.do",
//   })
//     .then((response) => {
//       console.log(response.data);
//       setBoardList(response.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, []);

const logo = {
  uri: "https://reactnative.dev/img/tiny_logo.png",
  width: 64,
  height: 64,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  container2: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
  },
  justred: {
    color: "red",
    fontSize: 25,
  },
  impurple: {
    color: "purple",
    fontSize: 25,
    fontWeight: "bold",
  },
  title: {
    marginLeft: 15,
    fontWeight: "bold",
    color: "gray",
    fontSize: 16,
  },
  detail: {
    marginLeft: 15,
  },
});

class Dog extends Component {
  render() {
    let DogImg = "";
    if (this.props.type === "one") {
      DogImg = require("../assets/dog3.jpg");
    } else if (this.props.type === "two") {
      DogImg = require("../assets/dog2.jpg");
    }

    return (
      <View>
        <Image source={DogImg} style={{ width: 200, height: 200 }} />
      </View>
    );
  }
}

class Household extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
    };
  }

  writeAddress = () => {
    this.setState(
      {
        address: "서울시 구로구 천왕동",
      },
      function () {
        alert("주소가 출력되었습니다.");
      }
    );
  };

  writeDelete = () => {
    this.setState({
      address: "",
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.justred}>빨간색만 줌</Text>
          <Text style={[styles.justred, styles.impurple]}>
            배열로 여러 스타일 (빨강 - 보라 순)
          </Text>
          <Text style={[styles.impurple, styles.justred]}>
            배열로 여러 스타일 (보라 - 빨강 순)
          </Text>
          <Text>후에 입력한 스타일이 적용됨</Text>

          <Dog type="one" />
          <Dog type="two" />
          <Text>{this.state.address}</Text>
          <Button title={"나의 주소출력"} onPress={this.writeAddress} />
          <Button title={"리셋"} onPress={this.writeDelete} />

          <Fragment>
            <Text>아무 역할도 하지 않는데 감싸기만 하는 태그 = Fragment</Text>
          </Fragment>
        </View>
        {/* row */}
        <View style={styles.container2}>
          <Image
            source={require("../assets/rockcrab.png")}
            style={{ width: 150, height: 150 }}
          />

          <View style={{ flexDirection: "column" }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>활동연대</Text>
              <Text style={styles.detail}>2000, 2010</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>출생</Text>
              <Text style={styles.detail}>소환사의 협곡</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>활동유형</Text>
              <Text style={styles.detail}>강가 앞에서 부스터 씀</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>활동장르</Text>
              <Text style={styles.detail}>무빙의 왕 킹위게</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>데뷔</Text>
              <Text style={styles.detail}>정글 대개편 업데이트 이후</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.title}>활동이력</Text>
              <Text style={styles.detail}>3분 30초부터 주글때까지</Text>
            </View>
          </View>
        </View>

        <View style={{ width: 50, height: 50, backgroundColor: "blue" }}></View>

        <Text style={{ fontSize: 96 }}>Scroll me plzzzz</Text>
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Text style={{ fontSize: 96 }}>If you like</Text>
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Text style={{ fontSize: 96 }}>Scrolling down</Text>
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Text style={{ fontSize: 96 }}>What's the best</Text>
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Text style={{ fontSize: 96 }}>Framework around?</Text>
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Image source={logo} />
        <Text style={{ fontSize: 80 }}>React Native</Text>

        {/* {boardList.map((board, index) => (
      <View key={index}>
        <Text key={board}>{board}</Text>
      </View>
    ))} */}
      </ScrollView>
    );
  }
}

export default Household;
