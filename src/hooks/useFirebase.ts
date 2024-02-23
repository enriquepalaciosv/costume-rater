import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  Database,
  getDatabase,
  set,
  ref,
  push,
  update,
  remove,
  get,
  DataSnapshot,
} from "firebase/database";

export const useFirebase = () => {
  const [firebaseDb, setFirebaseDb] = useState<Database>();

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCgkeUzThpgmdzY6UgUpVTZqmWr-2kbrrQ",
      authDomain: "costume-rater.firebaseapp.com",
      databaseURL: "https://costume-rater-default-rtdb.firebaseio.com",
      projectId: "costume-rater",
      storageBucket: "costume-rater.appspot.com",
      messagingSenderId: "410923968247",
      appId: "1:410923968247:web:49604b99ae9ab281b495f2",
      measurementId: "G-FT40JQ97W5",
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    setFirebaseDb(db);

    return () => {};
  }, []);

  const saveCompetitor = async (name: string, type: string) => {
    if (firebaseDb) {
      const competitorsRef = ref(firebaseDb, "competitors");
      const newCompetitorRef = push(competitorsRef);

      const competitorData = {
        id: newCompetitorRef.key,
        name,
        type,
        status: "new",
        scores: [
          {
            id: 0,
          },
        ],
      };
      await set(newCompetitorRef, competitorData);
      return newCompetitorRef.key;
    }
  };

  const updateCompetitor = async (
    competitorId: string,
    updatedData: Partial<any>
  ) => {
    if (firebaseDb) {
      const competitorRef = ref(firebaseDb, `competitors/${competitorId}`);
      await update(competitorRef, updatedData);
    }
  };

  const deleteCompetitor = async (competitorId: string) => {
    if (firebaseDb) {
      const competitorRef = ref(firebaseDb, `competitors/${competitorId}`);
      await remove(competitorRef);
    }
  };

  const getAllCompetitors = async () => {
    if (firebaseDb) {
      const competitorsRef = ref(firebaseDb, "competitors");
      const dataSnapshot: DataSnapshot = await get(competitorsRef);

      if (dataSnapshot.exists()) {
        const competitorsData: Record<string, any> = dataSnapshot.val();
        const competitorsArray = Object.values(competitorsData);

        return competitorsArray;
      } else {
        return [];
      }
    }
  };

  return {
    saveCompetitor,
    updateCompetitor,
    deleteCompetitor,
    getAllCompetitors,
  };
};

export default useFirebase;
