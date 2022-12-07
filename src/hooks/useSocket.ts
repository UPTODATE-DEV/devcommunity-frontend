import { BASE_API_URL } from "@/config/url";
import { useRouter } from "next/router";
import { useEffect } from "react";
import io from "socket.io-client";
import useStore from "./useStore";

const socket = io(BASE_API_URL);

const useSocket = () => {
  const { locale } = useRouter();
  const session = useStore((state) => state.session?.user);

  useEffect(() => {
    // Notification.requestPermission().then((result) => {
    //   console.log("NOTIFICATIONS:" + result);
    // });

    // socket.on("notification", (data: Notification) => {
    //   if (data?.notificationFromUser?.id !== data?.post?.author?.id && data?.notificationFromUser?.id !== session?.id) {
    //     Notification.requestPermission((result) => {
    //       if (result === "granted") {
    //         navigator.serviceWorker.ready.then((registration) => {
    //           registration.showNotification(data?.post?.title, {
    //             body: `${data.notificationFromUser?.firstName} ${data.notificationFromUser?.lastName} ${
    //               data?.type === "COMMENT"
    //                 ? locale === "fr"
    //                   ? "a commenté votre"
    //                   : "commented on your"
    //                 : locale === "fr"
    //                 ? "a réagi à votre"
    //                 : "reacted on your"
    //             } ${data?.post.type === "ARTICLE" ? "article" : "post"}`,
    //             icon: "/favicon.ico",
    //             vibrate: [200, 100, 200, 100, 200, 100, 200],
    //             tag: data?.id,
    //           });
    //         });
    //       }
    //     });
    //   }
    // });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("notification");
    };
  }, []);
  return socket;
};

export default useSocket;
