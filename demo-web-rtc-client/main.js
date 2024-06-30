const socket = io("https://meet.phongthuytaman.com");

function openStream(){
    const config = {audio: false, video: true};
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(videoTag, stream){
    const video = document.getElementById(videoTag);
    video.srcObject = stream;
    video.play();
}


// openStream()
//     .then(stream => playStream("localStream", stream)); 

const peer = new Peer();
peer.on('open', id => {
    $("#my-peer-id").append(id);
    
    $("#btnSignup").click(()=> {
        const username = $("#txtUsername").val();
        socket.emit("signup", {username, id});
    })
});

//Caller, phía người gọi
$('#btnCall').click(()=> {
    const id = $("#roomId").val();

    openStream()
    .then(stream => {
        playStream("localStream", stream);

        const call = peer.call(id, stream);
        call.on("stream", remoteStream => playStream('remoteStream', remoteStream));
    });
});

//phía người nhận
peer.on("call", call => {
    openStream()
    .then(stream => {
        call.answer(stream);
        playStream('localStream', stream);
        call.on("stream", remoteStream => playStream("remoteStream", remoteStream));
    })
});

$("#div_chat").hide();
//hieenr thij danh sach ng trong room (gianhf cho người mới vô)
socket.on("member_room", listMember => {
    $("#div_chat").show();
    $("#div_signup").hide();

    console.log(listMember);

    const lis = listMember.map((user)=> {
        return `<li id="${user.id}">${user.username}</li>`
    })
    $("#member-list").append(lis);

    //hiển thị người mới vô cho mọi người đã trong room biết
    socket.on("new_member", user => {
        $("#member-list").append(`<li id="${user.id}">${user.username}</li>`);
    });

    //ai do thoat
    socket.on('member_disconnect', id => {
        $(`#${id}`).remove();
    })
});

socket.on('signup_fail', ()=> {
    alert("tk đã tồn tại")
})


//goij
$("#member-list").on("click", 'li', function(){
    const id = $(this).attr('id');
    openStream()
    .then(stream => {
        playStream("localStream", stream);

        const call = peer.call(id, stream);
        call.on("stream", remoteStream => playStream('remoteStream', remoteStream));
    });
})
