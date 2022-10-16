import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext, useEffect } from "react";
import { DiaryDispatchContext } from "./../App.js";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭 저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔직함",
  },
];

export const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
};

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const navigate = useNavigate();

  // 작성한걸 홈에 데이터에 추가하기, onCreate();
  const handleSubmit = () => {
    // 길이가 안되면 focus
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
        // 추가하고 홈으로 이동, 뒤로버튼으로 여기 페이지로 못돌아옴
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }

    navigate("/", { replace: true });
  };

  // isEdit과 originData가 바꼈을때 수행
  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
      </div>

      <section>
        <h4>오늘의 감정</h4>
        <div className="input_box emotion_list_wrapper">
          {emotionList.map((it) => (
            <EmotionItem
              key={it.emotion_id}
              {...it}
              onClick={handleClickEmote}
              isSelcted={it.emotion_id === emotion}
            />
          ))}
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className="input_box text_wrapper"></div>
        <textarea
          placeholder="오늘은 어땠나요?"
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </section>
      <section>
        <div className="control_box">
          <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
          <MyButton
            text={"작성하기"}
            type={"positive"}
            onClick={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default DiaryEditor;