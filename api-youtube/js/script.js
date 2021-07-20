// ----------------------------------------- Lista de Filmes ----------------------------------------- //
const movies = [{
    "name": "black-widow",
    "id": "Fp9pNPdNwjI",
}, {
    "name": "eternals",
    "id": "Vv8q8UDU9_k",
},
{
    "name": "doctor-strange",
    "id": "CCQKwUIDfic",
},
{
    "name": "loki",
    "id": "bEJI-DfxIxY",
}, {
    "name": "what-if",
    "id": "RDWPqWhXl-U",
}];
let player;

$(document).ready(() => {

    // ----------------------------------------- API Youtube ----------------------------------------- //
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // ----------------------------------------- Tabs & Accordion ----------------------------------------- //
    $(function () {
        $("#movie-list").tabs();
    });
    $(".accordion").accordion();

    // ----------------------------------------- API Youtube - Iframe ----------------------------------------- //
    $("#movie-list").on("click", ".tab", function () {
        const id = $(this).attr("value");
        deleteVideo();

        player = new YT.Player(`movie-${id}`, {
            height: '360',
            width: '640',
            videoId: `${movies[id - 1].id}`,
            playerVars: {
                "modestbranding": 1,
                rel: 1
            },
            events: {
                'onReady': onPlayerReady
            }
        });
        console.log(player);
    });

    // ----------------------------------------- Para o vídeo e limpa o accordion ----------------------------------------- //
    function deleteVideo() {
        $("#movie-list iframe").attr("src", "");
        $(".accordion p").html("");
    };


    // ----------------------------------------- Play vídeo & Põe informações no accordion ----------------------------------------- //
    async function onPlayerReady(event) {
        event.target.playVideo();

        const title = event.target.playerInfo.videoData.title;

        const author = await function() {
            if (event.target.playerInfo.videoData.author == "") {
                return "Desconhecido"
            } else {
                return event.target.playerInfo.videoData.author
            }
        };
        // console.log(event.target.playerInfo.videoData.author);

        let duration = player.getDuration();
        durationMinutes = Math.floor(duration / 60);
        durationSeconds = duration - (durationMinutes * 60);


        $(".description").html(`
      <p>${title}</p>
      `);
        $(".duration").html(`
      <p>${durationMinutes} min e ${durationSeconds} segundos </p>
      `);
        $(".author").html(`
      <p>${author()}</p>
      `);
    };

});
