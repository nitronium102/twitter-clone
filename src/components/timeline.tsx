import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);

  // 유저가 화면을 보지 않을 때 값을 반환하면서 cleanUp 실행
  // 다른 페이지로 이동하면 실시간으로 가져올 필요 없음
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );

      // 이벤트 리스너에 구독 진행
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, createdAt, userId, username, photo } = doc.data();
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
          };
        });
        setTweet(tweets);
      });
    };
    fetchTweets();
    // teardown 실행될 때 unmount
    return () => {
      unsubscribe && unsubscribe(); // unsubscribe가 참이라면 호출
    };
  }, []);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
