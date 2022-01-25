import React, { useState, useEffect } from "react";
import { FlatList, Image, View, Text, StyleSheet } from "react-native";


interface Member{
    login: string;
    avatar_url: string;
}

const Main: React.FC = () => {
  const [members, setMenbers] = useState<Member[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/orgs/rocketseat/members").then((response) => {
      response.json().then((data) => {
        setMenbers(data);
      });
    });
  }, []);

  return (
    <FlatList
      contentContainerStyle={{ padding:24 }}
      data={members}
      keyExtractor={(members) => members.login}
      renderItem={({ item: member }) => (<View style={styles.member}>
        <Image style={styles.image} source={{uri:member.avatar_url}}  />
        <Text>{member.login}</Text>
    </View>)}
    />
  );
}

const styles = StyleSheet.create({
  member:{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  image:{
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  }
})

export default Main