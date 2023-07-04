import { useEffect } from "react";

export const getDate = (dateStr: string) => {
  const splitted = dateStr.split("-");
  const date = new Date(+splitted[0], +splitted[1] - 1, +splitted[2]);
  const longMonth = date.toLocaleString("en-US", { month: "long" });
  return `${longMonth} ${splitted[2]}, ${splitted[0]}`;
};

export const getSplitted = (arr: any) => {
  const resultArr = [];
  for (let i = 0, isFirst = true; i < arr.length; ) {
    if (isFirst) {
      resultArr.push([arr[i], arr[i + 1], arr[i + 2]].filter((el) => el));
      i = i + 3;
      isFirst = false;
    } else {
      resultArr.push(
        [arr[i], arr[i + 1], arr[i + 2], arr[i + 3]].filter((el) => el)
      );
      i = i + 4;
    }
  }
  return resultArr;
};

export function* getAccessToken() {
  const accessToken = localStorage.getItem("accessToken");
  const resp: Response = yield fetch(
    "https://studapi.teachmeskills.by/auth/jwt/verify/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: accessToken }),
    }
  );
  if (resp.status === 200) {
    return accessToken;
  } else {
    const refreshToken = localStorage.getItem("refreshToken");
    const resp: Response = yield fetch(
      "https://studapi.teachmeskills.by/auth/jwt/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      }
    );
    if (resp.status === 200) {
      const res: { access: string } = yield resp.json();
      localStorage.setItem("accessToken", res.access);
      return res.access;
    }
  }
}

export const useClickOutside = (
  ref: React.RefObject<HTMLElement> | Array<React.RefObject<HTMLElement>>,
  cb: (e: MouseEvent | TouchEvent) => void
): void => {
  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      const checkClickedElement = (el: React.RefObject<HTMLElement>) =>
        !el.current || el.current.contains(event.target as Element);

      if (
        (Array.isArray(ref) && ref.find(checkClickedElement)) ||
        (!Array.isArray(ref) && checkClickedElement(ref))
      ) {
        return;
      }

      cb(event);
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [ref, cb]);
};
