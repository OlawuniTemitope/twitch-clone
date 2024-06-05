import { create } from "zustand";

interface CreatorsidebarProps {
    collapsed:boolean;
     onExpand:()=>void;
      onCollapse:()=>void;
}

export const useCreatorSidebar = create<CreatorsidebarProps>((set)=>({
    collapsed:false,
     onExpand:()=>set(()=>({collapsed:false})),
      onCollapse:()=>set(()=>({collapsed:true}))
}))