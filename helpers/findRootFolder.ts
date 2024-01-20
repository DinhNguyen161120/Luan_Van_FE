import { folder } from "../component/DriverPage/DriverPage";

export const findRootFolder = (folders: folder[], userId: string): folder => {
    let folderCurrent = null;
    if (folders) {
        folders.forEach((folder) => {
            if (folder.parent == null && folder.path == '/My Drive') {
                folderCurrent = folder;
            }
        });
    }
    return folderCurrent;
};
