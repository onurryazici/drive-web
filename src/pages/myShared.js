import { MessengerSocket, MessengerStore } from 'messaging-app-ui'
import React, { useEffect } from 'react'
import RFM, { RFM_Socket } from 'react-file-manager-rfm'
import Header from '../page-components/main/Header/Header'
import NavbarLeft from '../page-components/main/NavbarLeft/NavbarLeft'

export default function MyShared() {
    var session = JSON.parse(sessionStorage.getItem('sessionObject'))

    useEffect(() => {
        let usernameData = session.data.username
        MessengerSocket.auth = { usernameData }
        MessengerSocket.connect()
        MessengerSocket.emit("USER_CONNECTED", usernameData)    
        MessengerStore.selectedUser=""

        RFM_Socket.auth = { usernameData}
        RFM_Socket.connect()
        RFM_Socket.emit("USER_CONNECTED", usernameData)
    }, [])
    return (
        <div>
            <Header/>
            <NavbarLeft/>
            <div id="main-container">
                <RFM 
                location                      = {`/home/${session.data.username}/drive-shared`}
                rfmWindow                     = "MY_SHARED"
                username                      = {`${session.data.username}`}
                API_URL                       = "http://192.168.91.130:3030"
                API_URL_UserAuthentication    = "/api/open-service/userAuthentication"
                API_URL_AddToDrive            = "/api/secured/addToDrive"
                API_URL_RemoveItemPermanently = "/api/secured/removeItemPermanently"
                API_URL_RemoveSharedItem      = "/api/secured/removeSharedItem"
                API_URL_CreateCopy            = "/api/secured/createCopy"
                API_URL_CreateDirectory       = "/api/secured/createDirectory"
                API_URL_Download              = "/api/secured/download"
                API_URL_EmptyTrash            = "/api/secured/emptyTrash"
                API_URL_GetDirectory          = "/api/secured/getDirectory"
                API_URL_GetDataSingle         = "/api/secured/getDataSingle"
                API_URL_GetImage              = "/api/secured/getImage"
                API_URL_MoveItems             = "/api/secured/moveItems"
                API_URL_MoveToTrash           = "/api/secured/moveToTrash"
                API_URL_MoveToDrive           = "/api/secured/moveToDrive"
                API_URL_RemovePermission      = "/api/secured/removePermission"
                API_URL_UpdatePermission      = "/api/secured/updatePermission"
                API_URL_RenameItem            = "/api/secured/renameItem"
                API_URL_RestoreItems          = "/api/secured/restoreItems"
                API_URL_NewShareItem          = "/api/secured/newShareItem"
                API_URL_ExistShareItem        = "/api/secured/existShareItem"
                API_URL_UploadItem            = "/api/secured/uploadItem"
                API_URL_IsUserExist           = "/api/secured/isUserExist"
                tokenName                     = "user-token"
                />
                </div>
        </div>
    )
}
