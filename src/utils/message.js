import { ElNotification } from 'element-plus'
function susses_msg(msg) {
    ElNotification({
        title: 'Success',
        message: msg,
        type: 'success',
        duration: 1500,
    })
}

function error_msg(msg) {
    ElNotification({
        title: 'warning',
        message: msg,
        type: 'warning',
        duration: 1500,
    })
}
export {
    susses_msg,
    error_msg
}