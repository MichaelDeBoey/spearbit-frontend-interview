import {FunctionComponent, useState} from "react";
import {FolderIcon} from "./FolderIcon";
import {FileIcon} from "./FileIcon";
import {ChevronDown} from "./ChevronDown";
import {ChevronRight} from "./ChevronRight";

type FileType = {
    name: string;
    type: 'file';
}
type FolderType = {
    name: string;
    type: 'folder';
    children: Array<FolderType | FileType>;
};
const data: Array<FolderType|FileType> = [
    {
        "name": "src",
        "type": "folder",
        "children": [
            {
                "name": "data",
                "type": "folder",
                "children": [
                    {
                        "name": "index.js",
                        "type": "file"
                    }
                ]
            },
            {
                "name": "index.js",
                "type": "file"
            },
            {
                "name": "index.css",
                "type": "file"
            }
        ]
    },
    {
        "name": "state.ts",
        "type": "file"
    }
];


export const FileSelector: FunctionComponent = () =>{
    return data.map(fileOrFolder => (
        <FileOrFolder data={fileOrFolder} path="" />
    ))
}


type FileOrFolderProps= {
    data: FileType | FolderType;
   path: string;
}
const FileOrFolder: FunctionComponent<FileOrFolderProps> = ({data: fileOrFolder, path}) => {
    const [isOpen, setIsOpen] = useState(false);
    const Icon = fileOrFolder.type === 'folder' ? FolderIcon : FileIcon;
    const newPath = `${path}/${fileOrFolder.name}`;

    return <div>
       <div onClick={() => {
           setIsOpen(prevOpen => !prevOpen);
           console.log(newPath)
       }}>
           {fileOrFolder.type === 'folder'
               ? isOpen ? <ChevronDown/> : <ChevronRight/>
               : null}

           <Icon/>

           <span>{fileOrFolder.name}</span>
       </div>

        {isOpen && fileOrFolder.type === 'folder'? (
            <div>
                {fileOrFolder.children.map(childFileOrFolder => (
                    <FileOrFolder data={childFileOrFolder} path={newPath} />
                ))}
            </div>
        ): null}
    </div>
}