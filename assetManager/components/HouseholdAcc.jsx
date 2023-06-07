import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

function HouseholdAcc(props) {
  const [breakdown, setBreakdown] = useState([]);

  const [data, setData] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://192.168.0.91:8888/app/rest/webboard/list.do",
      data: {
        year: year,
        month: month,
      },
    })
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {});
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:8888/rest/webboard/list.do")
  //     .then((response) => response.json())
  //     .then((breakdown) => {
  //       setBreakdown(breakdown);
  //       //setLoading(false);
  //     });
  // });

  // useEffect(() => {
  //   // 데이터를 가져오는 함수를 정의합니다.
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://192.168.0.91:8888/rest/webboard/list.do"
  //       );
  //       setData(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   // 컴포넌트가 마운트되었을 때 데이터를 가져옵니다.
  //   fetchData();
  // }, []);

  const styles = StyleSheet.create({
    margin: {
      marginLeft: 150,
    },
    smallgray: {
      fontSize: 13,
      color: "gray",
    },
  });

  const today = new Date();
  const year = today.getFullYear(); // 연도
  const month = today.getMonth() + 1; // 월 (0부터 시작하므로 1을 더함)
  const day = today.getDate(); // 일

  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);

  const handleMinusMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear((prevYear) => prevYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handlePlusMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear((prevYear) => prevYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
        }}
      >
        <View style={{ flex: 1, marginLeft: 15, marginBottom: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={handleMinusMonth}>
              <Ionicons
                name="caret-back-outline"
                style={{ marginTop: 9, marginRight: 5 }}
              ></Ionicons>
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {currentYear}년 {currentMonth}월
            </Text>
            <TouchableOpacity onPress={handlePlusMonth}>
              <Ionicons
                name="caret-forward-outline"
                style={{ marginTop: 9, marginLeft: 5 }}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          // 인덱스 = 0 즉, 첫번째 순서에는 null 할당
          // 그 이후 애들한테는 그 전의 아이템 할당
          const previousItem = index > 0 ? data[index - 1] : null;
          const showDate =
            !previousItem || previousItem.exchangeDate !== item.exchangeDate;

          return (
            <View>
              {showDate && (
                <View>
                  <Text style={{ marginTop: 30 }}>{item.exchangeDate}</Text>
                  <View
                    style={{
                      backgroundColor: "gray",
                      height: 1,
                      marginTop: 10,
                      width: 350,
                    }}
                  />
                </View>
              )}

              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Text>{item.content}</Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  {item.withdraw > 0 ? (
                    <Text>- {item.withdraw.toLocaleString()}원</Text>
                  ) : (
                    <Text>{item.deposit.toLocaleString()}원</Text>
                  )}
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.smallgray}>{item.bank}</Text>
                <Text style={styles.smallgray}>
                  {" "}
                  | {item.exchangeTime.slice(0, -3)}
                </Text>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <Text style={styles.smallgray}>
                    {item.balance.toLocaleString()}원
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <TextInput placeholder="카테고리 작성" />
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <TextInput placeholder="메모 작성" />
                </View>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.detailCode}
      ></FlatList>
    </SafeAreaView>
  );
}

export default HouseholdAcc;
