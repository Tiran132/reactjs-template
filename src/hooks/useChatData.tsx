import { DisplayDataRow } from "@/components/DisplayData/DisplayData";
import { useInitData } from "@tma.js/sdk-react";
import { useMemo } from "react";

function useChatData() {
  const initData = useInitData();

  const chatRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initData?.chat) {
      return;
    }
    const { id, title, type, username, photoUrl } = initData.chat;

    return [
      { title: "id", value: id.toString() },
      { title: "title", value: title },
      { title: "type", value: type },
      { title: "username", value: username },
      { title: "photo_url", value: photoUrl },
    ];
  }, [initData]);

  return chatRows
}

export default useChatData; 