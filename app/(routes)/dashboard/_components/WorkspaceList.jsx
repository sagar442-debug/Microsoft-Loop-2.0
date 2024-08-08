"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { AlignLeft, LayoutGrid } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function WorkspaceList() {
  const { user } = useUser();
  const [workspaceList, setWorkspaceList] = useState([]);
  return (
    <div className="my-10 p-10 md:px-24 lg:px-36 xl:px-52">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">
          Hello,<span className="uppercase"> {user?.fullName}</span>
        </h2>
        <Button>+</Button>
      </div>
      <div className="mt-10 flex justify-between">
        <div>
          <h2 className="font-medium text-primary">Workspaces</h2>
        </div>
        <div className="flex gap-2">
          <LayoutGrid />
          <AlignLeft />
        </div>
      </div>
      {workspaceList?.length == 0 ? (
        <div className="flex flex-col items-center justify-center my-10">
          <Image
            src={"/workspace.png"}
            height={200}
            width={200}
            alt="empty-workspace-image"
          />
          <h2>Create a new workspace</h2>
          <Button variant="outline" className="my-3">
            + New Workspace
          </Button>
        </div>
      ) : (
        <div>Workspace List</div>
      )}
    </div>
  );
}

export default WorkspaceList;
