import { MessengerSocket, MessengerStore } from 'messaging-app-ui'
import React, { useEffect } from 'react'
import RFM from 'react-file-manager-rfm'
import { useMediaQuery } from 'react-responsive'
import NavbarMobile from '../components/navbar'
import Sidebar from '../components/sidebar'

export default function Trash() {
    var session = JSON.parse(sessionStorage.getItem('sessionObject'))
    useEffect(() => {
        let usernameData = session.data.username
        MessengerSocket.auth = { usernameData }
        MessengerSocket.connect()
        MessengerSocket.emit("USER_CONNECTED", usernameData)    
        MessengerStore.selectedUser=""
    }, [])
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-device-width: 1224px)' })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    const containerStyle= isDesktopOrLaptop || isBigScreen ? "main-container-desktop" : "main-container-mobile"
    return (
        <React.Fragment>
            {
                isDesktopOrLaptop || isBigScreen 
                ? <Sidebar/>
                : <NavbarMobile/>
            }
            <div id={containerStyle}>
                <RFM 
                location                      = {`/home/${session.data.username}/.local/share/Trash/files`}
                rfmWindow                     = "RECYCLE_BIN"
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
        </React.Fragment>
    )
}
