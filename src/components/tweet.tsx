import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const CreatedAt = styled.span`
  margin: 10px;
  font-size: 15px;
  color: grey;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

export default function Tweet({
  createdAt,
  username,
  photo,
  tweet,
  userId,
  id,
}: ITweet) {
  const user = auth.currentUser;
  const dateObject: Date = new Date(createdAt * 100);
  dateObject.setHours(dateObject.getHours() + 9);
  const formattedDate: string = dateObject.toISOString();

  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");

    if (!ok || user?.uid !== userId) return;
    try {
      // firestore database의 데이터 삭제
      await deleteDoc(doc(db, "tweets", id));
      // storage 삭제
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <CreatedAt>{formattedDate}</CreatedAt>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        ) : null}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
