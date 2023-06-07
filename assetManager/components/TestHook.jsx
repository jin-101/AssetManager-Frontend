import React, { useState, useEffect } from "react";
import { Button, Text, View, FlatList, Item, SafeAreaView } from "react-native";

function Hook(props) {
  const [name, setName] = useState("Jin"); //Jin으로 초기값 설정
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        setUsers(users);
        //setLoading(false);
      });
  });

  useEffect(() => {
    // 데이터를 가져오는 함수를 정의합니다.
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://your-spring-boot-api-endpoint"
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // 컴포넌트가 마운트되었을 때 데이터를 가져옵니다.
    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <Text>안녕하세요 Hook Test입니다.</Text>
      <Text> {name} 님, 안녕하세요</Text>
      <Button title={"이름변경"} onPress={() => setName("Chan")}></Button>
      {/* useEffect부터 하면 됨 */}
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.address.city}</Text>
            <Text>----------------------------</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

export default Hook;
