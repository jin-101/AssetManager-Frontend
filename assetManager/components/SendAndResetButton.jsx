import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Stack,
  Text,
  VStack,
  Select,
  Button,
} from "native-base";
import axios from "axios";
import { TextInput, FlatList, Alert, TouchableOpacity } from "react-native"; // ★ Alert를 native-base가 아니라 react-native껄 쓰면 그나마 뭐라도 좀 되네
import { Picker } from "@react-native-picker/picker";
import AlertExample from "../components/AlertExample";
import { apiPath } from "../services";

function SendAndResetButton(props) {
  return <div></div>;
}

export default SendAndResetButton;
