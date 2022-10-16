import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { DiaryDispatchContext } from "./../App.js";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

import { emotionList } from "../util/emotion.js";
import { getStringDate } from "../util/date.js";

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

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

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
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
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
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
