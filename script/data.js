// status of the image boxes
gallery = {
    g1: { pos: 0, max: 2, path: 'pixel' },
    g2: { pos: 0, max: 3, path: 'k85_wallpaper_tool' },
    viewer: { pos: 0, max: 1, path: 'led_display' }
}


projects = [
    {
        'name': 'Pixel Finder',
        'path': 'pixel',
        'max_img': 2,

        'desc_en': `
            <p>website allowing <a target="_blank" href="https://www.reddit.com/r/place/">r/place</a> users to view their pixels</p>
            <p>works for the 2017, 2022 and 2023 events</p>
            <p><a class="link icon" target="_blank" href="https://kisielo85.github.io/pixel_finder/">website</a></p>
            <p><a class="reddit icon" target="_blank" href="https://www.reddit.com/r/place/comments/u79a4s/website_that_shows_users_placed_pixels/">original post</a></p>
            <p><a class="github icon" target="_blank" href="https://github.com/kisielo85/pixel_finder-place2022">github repo</a></p>
        `,
    },
    {
        'name': 'Neon Sector',
        'path': 'neon_sector',
        'max_img': 3,

        'desc_en': `
            <p>a game made in Godot Engine</p>
            <a target="_blank" class="itchio icon" href="https://kisielo85.itch.io/neon-sector">itchio page</a>
        `,
    },
    {
        'name': 'Led display',
        'path': 'led_display',
        'max_img': 1,

        'desc_en': `
            <p>6x6 display, made with Arduino UNO and some cardboard</p>
            <p>it was a great learning experience on multiplexing</p>
            <a target="_blank" class="instagram icon" href="https://www.instagram.com/p/Cljcgqft6sT/">instagram post</a>
        `,
    },
    {
        'name': 'The Amazing Game',
        'path': 'the_amazing_game',
        'max_img': 3,

        'desc_en': `
            <p>Console game written in C++</p>
            <p>It was my first "big" project, made it with a friend while we were learning C++ back in 2018</p>
            <p>Creating it using only the default libraries wasn't easy, but we took it as a challenge and managed to get it done</p>
            <p><a class="youtube icon" target="_blank" href="https://youtu.be/2Jsje4hxERo/">gameplay video</a></p>
        `,
    },
    {
        'name': 'TebTableBot',
        'path': 'tebtablebot',
        'max_img': 4,

        'desc_en': `
            <p>Discord bot connected to my schools class schedule</p>
            <p>It can generate lesson timetables, quickly tell you where to find a class or a teacher, and notify you where is your next lesson</p>
            <p>Made with my classmate: <a target="_blank" href="https://le-programer.github.io/">Le-programer</a></p>
            <p><a class="github icon" target="_blank" href="https://github.com/kisielo85/TebTableBot">github repo</a></p>
        `,
    },
    {
        'name': 'amogi skin generator',
        'path': 'amogi_skin_generator',
        'max_img': 3,

        'desc_en': `
            <p>When playing Minecraft with friends, we sometimes like to choose matching skins.<br>
            And after finding this <a href="https://pl.namemc.com/skin/7fd3630174f98f59">Muscular Amogus</a> on NameMC, I thought it would be funny to have a Bedwars team of these</p>
            <p>So I've put together a simple script, for generating different colored crewmates</p>
            <p><a class="download icon" target="_blank" href="/tiny_projects/amogi_skin_generator.zip">download</a></p>
        `,
    },
    {
        'name': 'Universal remote',
        'path': 'arduino_remote',
        'max_img': 2,

        'desc_en': `
            <p>This remote is capable of saving up to 40 IR signals and re-creating them</p>
            <p>Made with Arduino UNO and some cardboard, it works with basically anything controlled with infrared light</p>
            <p><a class="instagram icon" target="_blank" href="https://www.instagram.com/p/C4BjZfgIlvN/?img_index=3">instagram post</a></p>
        `,
    },
    {
        'name': 'Pong Online',
        'path': 'pong_online',
        'max_img': 2,

        'desc_en': `
            <p>A spin on the classic pong game</p>
            <p>My main focus here was to make an online multiplayer game, the connection is made by sharing a 5-character code that's being decrypted into the host's IP adress</p>
            <p><a class="youtube icon" target="_blank" href="https://youtu.be/6CG9Ekcmb7Y">gameplay video</a></p>
            <a class="itchio icon" target="_blank" href="https://kisielo85.itch.io/pong-online">itchio page</a>
        `,
    },
    {
        'name': 'proc_passw86',
        'path': 'proc_passw',
        'max_img': 2,

        'desc_en': `
            <p>This one is more of a programming challenge</p>
            <p>Me and my friends were making simple programs that prompts the user for a password<br>
            The goal was to somehow guess, hack, or brute-force the correct string.</p>
            <p>I decided to make my script open-source, but it's scrambled, unreadable, and is probably the ugliest code I've ever made.
            <p>So if you're up for the challenge, go ahead and download it. The rules are simple: You can test and edit the code however you want, but a password must work for the original unedited version. Good luck!</p>
            <a class="download icon" target="_blank" href="/tiny_projects/proc_passw86.bat">download</a></p>
        `,
    },
    {
        'name': 'k85 wallpaper tool',
        'path': 'k85_wallpaper_tool',
        'max_img': 3,

        'desc_en': `
            <p>A simple tool for setting wallpapers</p>
            <p>If you ever wanted to set a wallpaper that would span across multiple monitors, you probably know how hard it is to make it look seamless.</p>
            <p>This script quickly solves this issue, it takes into account differences in display sizes as well as the gaps between them, 
            allowing you to set a perfectly aligned wallpaper.</p>
            <a class="github icon" target="_blank" href="https://github.com/kisielo85/k85-wallpaper-tool">github repo</a></p>
        `,
    },
]