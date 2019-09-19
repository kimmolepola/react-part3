import React from 'react'

const Notify = (message, className, setNotification) => {
    setNotification({ message: message, className: className })
    setTimeout(() => {
        setNotification({ message: null })
    }, 5000)
}

const Notification = ({ notification }) => {
    if (notification.message === null) {
        return null
    }
    return (
        <div className={notification.className}>
            {notification.message}
        </div>
    )
}

export default { Notify, Notification }