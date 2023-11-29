import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currUser?: SafeUser | null
}

const useFavorite = ({ listingId, currUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currUser?.favorites || [];

    return list.includes(listingId);
  }, [currUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    currUser, 
    hasFavorited, 
    listingId, 
    loginModal,
    router
  ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;