"use client";
import Logo from "@/app/_components/Logo";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebaseConfig";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";

import {
  collection,
  doc,
  onSnapshot,
  query,
  QuerySnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import { Bell, Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import DocumentList from "./DocumentList";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MAX_FILE = process.env.NEXT_PUBLIC_MAX_FILE_COUNT;

function SideNav({ params }) {
  const [documentList, setDocumentList] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    params && GetDocumentList();
  }, [params]);

  const GetDocumentList = () => {
    const q = query(
      collection(db, "workspaceDocuments"),
      where("workspaceId", "==", Number(params?.workspaceId))
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const docs = QuerySnapshot.docs.map((doc) => doc.data());
      setDocumentList(docs);
    });
  };

  const CreateNewDocument = async () => {
    if (documentList?.length >= MAX_FILE) {
      toast.warning("Upgrade to add new file", {
        description:
          "You've reached max file limit, Please upgrade to create new file!",
        action: {
          label: "Upgrade",
        },
      });
      return;
    }
    setLoading(true);
    const docId = uuid4();
    await setDoc(doc(db, "workspaceDocuments", docId.toString()), {
      workspaceId: Number(params?.workspaceId),
      createdBy: user?.primaryEmailAddress?.emailAddress,
      coverImage: null,
      emoji: null,
      id: docId,
      documentName: "Untitled Document",
      documentOutput: [],
    });

    await setDoc(doc(db, "documentOutput", docId.toString()), {
      docId: docId,
      output: [],
    });

    router.replace("/workspace/" + params?.workspaceId + "/" + docId);
    setLoading(false);
  };
  return (
    <div className="h-screen fixed md:w-72 hidden md:block bg-blue-50 p-5 shadow-md">
      <div className="flex justify-between items-center  ">
        <Logo />
        <Bell className="h-5 w-5 text-gray-500" />
      </div>
      <hr className="my-5" />
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-medium">Workspace Name</h2>
          <Button onClick={CreateNewDocument} size={"sm"}>
            {loading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : "+"}
          </Button>
        </div>
      </div>
      {/* Document List */}
      <DocumentList documentList={documentList} params={params} />
      {/*  Progress bar */}
      <div className="absolute bottom-10 w-[85%]">
        <Progress value={(documentList?.length / MAX_FILE) * 100} />
        <h2 className="text-sm font-light my-2">
          <strong>{documentList.length}</strong> Out of <strong>5</strong> files
          used
        </h2>
        <h2 className="text-sm font-light ">
          Upgrade your plan for unlimited access
        </h2>
      </div>
    </div>
  );
}

export default SideNav;
