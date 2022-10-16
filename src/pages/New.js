import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  useEffect(() => {
    // title이라는 태그 네임을 가져와라
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - 새로운 일기`;
  }, []);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
};
export default New;
