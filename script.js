document.addEventListener('DOMContentLoaded', () => {
    // Helper function to reverse shrine names for lightroots
    const reverseName = (name) => {
        const cleanName = name.replace(' Shrine', '').trim();
        let reversed = cleanName.split('').reverse().join('');
        reversed = reversed.charAt(0).toUpperCase() + reversed.slice(1).toLowerCase();
        return reversed + ' Lightroot';
    };

    // Helper function for smooth dropdown animation
    function toggleContent(contentElement) {
        if (contentElement.classList.contains('active')) {
            // If active, close it
            contentElement.style.maxHeight = contentElement.scrollHeight + 'px'; // Set to current scrollHeight before collapsing
            // Force reflow
            contentElement.offsetWidth;
            contentElement.style.maxHeight = '0'; // Transition to 0
            contentElement.style.paddingTop = '0';
            contentElement.style.paddingBottom = '0';
            contentElement.classList.remove('active');
        } else {
            // If not active, open it
            contentElement.style.maxHeight = '0'; // Ensure it starts from 0
            contentElement.style.paddingTop = '15px'; // Apply padding immediately
            contentElement.style.paddingBottom = '15px';
            // Force reflow
            contentElement.offsetWidth;
            contentElement.style.maxHeight = contentElement.scrollHeight + 'px'; // Transition to actual scrollHeight
            contentElement.classList.add('active');

            // After transition, set to a large value to allow for dynamic content changes
            contentElement.addEventListener('transitionend', function handler() {
                if (contentElement.classList.contains('active')) {
                    contentElement.style.maxHeight = '9999px'; // Use a large fixed value for better stability
                }
                contentElement.removeEventListener('transitionend', handler);
            });
        }
    }


    // Data for Shrines and Lightroots, organized by location
    const shrineLightrootData = [
        {
            location: "Lookout Landing",
            shrines: [
                "Ishodag Shrine", "Jiosin Shrine", "Kyononis Shrine", "Sepapa Shrine",
                "Serutabomac Shrine", "Susuyai Shrine", "Yamiyo Shrine"
            ]
        },
        {
            location: "Hyrule Field",
            shrines: [
                "Kamizun Shrine", "Kyokugon Shrine", "Mayachin Shrine", "Riogok Shrine",
                "Sonapan Shrine", "Tajikats Shrine", "Teniten Shrine", "Tsutsu-um Shrine",
                "Tadarok Shrine", "Usazum Shrine"
            ]
        },
        {
            location: "Sahasra Slope",
            shrines: [
                "Eshos Shrine", "Jojon Shrine", "Jonsau Shrine", "Kurakat Shrine",
                "Makasura Shrine", "Morok Shrine", "O-ogim Shrine", "Ren-iz Shrine",
                "Tukarok Shrine"
            ]
        },
        {
            location: "Lindor’s Brow",
            shrines: [
                "Ikatak Shrine", "Iun-orok Shrine", "Kiuyoyou Shrine", "Makurukis Shrine",
                "Oromuwak Shrine", "Runakit Shrine", "Sinakawak Shrine", "Taki-ihaban Shrine"
            ]
        },
        {
            location: "Gerudo Highlands",
            shrines: [
                "Gasas Shrine", "Mayamats Shrine", "Otutsum Shrine", "Rotsumamu Shrine",
                "Suariwak Shrine", "Turakawak Shrine"
            ]
        },
        {
            location: "Gerudo Canyon",
            shrines: [
                "Chichim Shrine", "Irasak Shrine", "Karahatag Shrine", "Kitawak Shrine",
                "Kudanisar Shrine", "Mayatat Shrine", "Miryotanog Shrine", "Motsusis Shrine",
                "Rakakudaj Shrine", "Siwakama Shrine", "Soryotanog Shrine", "Turakamik Shrine"
            ]
        },
        {
            location: "Popla Foothills",
            shrines: [
                "En-oma Shrine", "Ishokin Shrine", "Jiukoum Shrine", "Jochisiu Shrine",
                "Joju-u-u Shrine", "Susub Shrine", "Utojis Shrine", "Utsushok Shrine"
            ]
        },
        {
            location: "Rabella Wetlands",
            shrines: [
                "Bamitok Shrine", "Marari-In Shrine", "Sifumim Shrine", "Tokiy Shrine"
            ]
        },
        {
            location: "Mount Lanayru",
            shrines: [
                "Anedamimik Shrine", "Jikais Shrine", "Jogou Shrine", "Mayahisik Shrine",
                "Zakusu Shrine", "Zanmik Shrine"
            ]
        },
        {
            location: "Upland Zorana",
            shrines: [
                "Apogek Shrine", "Gatanisis Shrine", "Ihen-a Shrine", "Joniu Shrine",
                "Maoikes Shrine", "Mogawak Shrine", "Rasitakiwak Shrine", "Yomizuk Shrine"
            ]
        },
        {
            location: "Ulri Mountain",
            shrines: [
                "Domizuin Shrine", "Gemimik Shrine", "Igashuk Shrine", "Jochi-ihiga Shrine",
                "Jochi-iu Shrine", "Kamatukis Shrine", "Mayachideg Shrine", "Rasiwak Shrine",
                "Sinatanika Shrine"
            ]
        },
        {
            location: "Eldin Canyon",
            shrines: [
                "Ekochiu Shrine", "Isisim Shrine", "Jiotak Shrine", "Kisinona Shrine",
                "Kimayat Shrine", "Marakuguc Shrine", "Momosik Shrine", "Moshapin Shrine",
                "Sibajitak Shrine", "Sitsum Shrine", "Timawak Shrine"
            ]
        },
        {
            location: "Thyphlo Ruins",
            shrines: [
                "Kikakin Shrine", "Mayak Shrine", "Minetak Shrine", "Musanokir Shrine",
                "Ninjis Shrine", "Pupunke Shrine", "Sakunbomar Shrine", "Sikukuu Shrine",
                "Tenmaten Shrine"
            ]
        },
        {
            location: "Pikida Stonegrove",
            shrines: [
                "Mayausiy Shrine", "Mayaotaki Shrine", "Nouda Shrine", "Orochium Shrine",
                "Oshozan-u Shrine"
            ]
        },
        {
            location: "Rospro Pass",
            shrines: [
                "Eutoum Shrine", "Gatakis Shrine", "Otak Shrine", "Rutafu-um Shrine",
                "Sahirow Shrine", "Sisuran Shrine", "Tauyosipun Shrine", "Wao-os Shrine"
            ]
        },
        {
            location: "Sky-Island Shrines", // These do not have corresponding lightroots
            shrines: [
                "Ga-Ahisas Shrine", "Ganos Shrine", "Gikaku Shrine", "Gutanbac Shrine",
                "Ijo-o Shrine", "Igoshon Shrine", "Jinodok Shrine", "Jirutagumac Shrine",
                "Joku-u Shrine", "Joku-usin Shrine", "Josiu Shrine",
                "Kadaunar Shrine", "Kahatanaum Shrine", "Kumamayn Shrine", "Mayam Shrine",
                "Mayanas Shrine", "Mayasiar Shrine", "Mayaumekis Shrine", "Mogisari Shrine",
                "Nachoyah Shrine", "Natak Shrine", "Rakashog Shrine", "Sihajog Shrine",
                "Simosiwak Shrine", "Siyamotsus Shrine", "Taninoud Shrine", "Taunhiy Shrine",
                "Tenbez Shrine", "Ukoojisi Shrine", "Ukouh Shrine", "Yansamin Shrine",
                "In-isa Shrine"
            ]
        }
    ];

    // Data for Skyview Towers (mapping location to tower name)
    const skyviewTowerData = {
        "Lookout Landing": "Lookout Landing Skyview Tower",
        "Hyrule Field": "Hyrule Field Skyview Tower",
        "Sahasra Slope": "Sahasra Slope Skyview Tower",
        "Lindor’s Brow": "Lindor's Brow Skyview Tower",
        "Gerudo Highlands": "Gerudo Highlands Skyview Tower",
        "Gerudo Canyon": "Gerudo Canyon Skyview Tower",
        "Popla Foothills": "Popla Foothills Skyview Tower",
        "Rabella Wetlands": "Rabella Wetlands Skyview Tower",
        "Mount Lanayru": "Mount Lanayru Skyview Tower",
        "Upland Zorana": "Upland Zorana Skyview Tower",
        "Ulri Mountain": "Ulri Mountain Skyview Tower",
        "Eldin Canyon": "Eldin Canyon Skyview Tower",
        "Thyphlo Ruins": "Thyphlo Ruins Skyview Tower",
        "Pikida Stonegrove": "Pikida Stonegrove Skyview Tower",
        "Rospro Pass": "Rospro Pass Skyview Tower",
    };

    // Korok Data Structure
    const korokRegionsData = [
        {
            region: "Akkala",
            link: "https://www.nintendolife.com/guides/zelda-tears-of-the-kingdom-akkala-korok-seeds",
            subregions: [
                { name: "Akkala Highlands", count: 37 },
                { name: "Deep Akkala", count: 32 },
                { name: "Lomei Sky Labyrinth", count: 1 },
                { name: "Sokkala Sky Archipelago", count: 2 }
            ]
        },
        {
            region: "Central Hyrule",
            link: "https://www.nintendolife.com/guides/zelda-tears-of-the-kingdom-central-hyrule-korok-seeds",
            subregions: [
                { name: "Hyrule Castle", count: 22 },
                { name: "Great Hyrule Forest", count: 30 },
                { name: "Great Plateau", count: 22 },
                { name: "Hyrule Field", count: 99 },
                { name: "Hyrule Ridge", count: 64 },
                { name: "Lake Hylia", count: 12 },
                { name: "North Hyrule Sky Archipelago", count: 2 },
                { name: "South Hyrule Sky Archipelago", count: 3 }
            ]
        },
        {
            region: "Eldin",
            link: "https://www.nintendolife.com/guides/zelda-tears-of-the-kingdom-eldin-korok-seeds",
            subregions: [
                { name: "Death Mountain", count: 14 },
                { name: "Eldin Canyon", count: 30 },
                { name: "Eldin Mountains", count: 19 },
                { name: "South Eldin Sky Archipelago", count: 2 }
            ]
        },
        {
            region: "Faron",
            link: "https://www.nintendolife.com/guides/zelda-tears-of-the-kingdom-faron-korok-seeds",
            subregions: [
                { name: "Faron Grasslands", count: 68 },
                { name: "Thunderhead Isles", count: 3 }
            ]
        },
        {
            region: "Gerudo",
            link: "https://www.nintendolife.com/guides/zelda-tears-of-the-kingdom-gerudo-korok-seeds",
            subregions: [
                { name: "Gerudo Desert", count: 71 },
                { name: "Gerudo Highlands", count: 40 },
                { name: "South Lomei Castle", count: 1 },
                { name: "Starview Island", count: 1 }
            ]
        },
        {
            region: "Great Sky Island",
            link: "https://www.nintendolife.com/guides/zelda-tears-of-the-kingdom-great-sky-island-korok-seeds",
            subregions: [
                { name: "Great Sky Island", count: 19 }
            ]
        },
        {
            region: "Hebra",
            link: "https://www.nintendolife.com/guides/zelda-tears-of-the-kingdom-hebra-korok-seeds",
            subregions: [
                { name: "Hebra Mountains", count: 56 },
                { name: "Tabantha Frontier", count: 41 },
                { name: "Tabantha Tundra", count: 28 },
                { name: "East Hebra Sky Archipelago", count: 3 },
                { name: "Rising Island Chain", count: 3 },
                { name: "South Hebra Sky Archipelago", count: 1 },
                { name: "Courage Island", count: 1 },
                { name: "Tabantha Sky Archipelago", count: 4 }
            ]
        },
        {
            region: "Lanayru",
            link: "https://www.nintendolife.com/guides/zelda-tears-of-the-kingdom-lanayru-korok-seeds",
            subregions: [
                { name: "Lanayru Wetlands", count: 33 },
                { name: "Mount Lanayru", count: 48 },
                { name: "Zora's Domain", count: 29 },
                { name: "Lanayru Sky Archipelago (Wellspring Island)", count: 3 },
                { name: "South Lanayru Sky Archipelago (Valor Island)", count: 3 }
            ]
        },
        {
            region: "Necluda",
            link: "https://www.nintendolife.com/guides/zelda-tears-of-the-kingdom-necluda-korok-seeds",
            subregions: [
                { name: "East Necluda", count: 70 },
                { name: "West Necluda", count: 75 },
                { name: "Necluda Sky Archipelago", count: 2 },
                { name: "North Necluda Sky Archipelago", count: 1 },
                { name: "West Necluda Sky Archipelago", count: 6 }
            ]
        }
    ];

    // Exploration & Locations Data Structure
    const explorationLocationsData = [
        {
            category: "Caves",
            link: "https://www.ign.com/wikis/the-legend-of-zelda-tears-of-the-kingdom/All_Caves_and_Cave_Map",
            items: [
                // Great Sky Island (4)
                { name: "Pondside Cave" },
                { name: "Mining Cave" },
                { name: "Pit Cave" },
                { name: "Bottomless Cave" },
                // Central Hyrule and Hyrule Field (13)
                { name: "Royal Hidden Passage" },
                { name: "Passeri Greenbelt Cave" },
                { name: "Ranch Ruins Cave" },
                { name: "Sage Temple Cave" },
                { name: "Ancient Tree Stump Cave" },
                { name: "Rebonae Bridge Cave" },
                { name: "Crenel Peak Cave" },
                { name: "Crenel Hills Cave" },
                { name: "Whistling Hill Cave" },
                { name: "Coliseum Ruins Cave" },
                { name: "Great Plateau Foothill Cave" },
                { name: "Shrine of Resurrection Cave" },
                { name: "River of the Dead Waterfall Cave" },
                { name: "Passeri Greenbelt Cave" }, // Added
                // Hebra, Tabantha, and Hyrule Ridge (27)
                { name: "North Hyrule Plain Cave" },
                { name: "Lindor's Brow Cave" },
                { name: "Thundra Plateau Cave" },
                { name: "Tanagar Canyon East Cave" },
                { name: "Satori Mountain Cave" },
                { name: "Satori Mountain Foothill Cave" },
                { name: "Tamio River Downstream Cave" },
                { name: "Ancient Columns Cave" },
                { name: "Tanagar Canyon West Cave" },
                { name: "Gisa Crater Cave" },
                { name: "Brightcap Cave" },
                { name: "Tabantha Hills Cave" },
                { name: "Kopeeki Drifts Cave" },
                { name: "Hebra Headspring Cave" },
                { name: "Talonto Peak Cave" },
                { name: "Hebra South Summit Cave" },
                { name: "Rospro Pass Cave" },
                { name: "West Lake Totori Cave" },
                { name: "Sturnida Springs Cave" },
                { name: "Lake Kilsie Cave" },
                { name: "North Biron Snowshelf Cave" },
                { name: "East Biron Snowshelf Cave" },
                { name: "Hebra Great Skeleton Cave" },
                { name: "Icefall Foothills Cave" },
                { name: "Hebra Mountains Northwest Cave" },
                { name: "Pikida Stonegrove Northwest Cave" },
                { name: "Mount Drena Foothill Cave" },
                // Gerudo Highlands and Gerudo Desert (24)
                { name: "Stalry Plateau Cave" },
                { name: "Mount Nabooru South Cave" },
                { name: "Lower Spectacle Rock Cave" },
                { name: "Mount Nabooru Cave" },
                { name: "Koukot Plateau Cave" },
                { name: "Yiga Blademaster Station" },
                { name: "Taafei Hill Cave" },
                { name: "Spectacle Rock Cave" },
                { name: "Gerudo Canyon Mine" },
                { name: "East Gerudo Ruin Cave" },
                { name: "Source of the Oasis Cave" },
                { name: "Quicksand Lake Cave" },
                { name: "Ancient Prison Ruins" },
                { name: "Gerudo Sanctuary" },
                { name: "Valley of Silent Statues" },
                { name: "Central Gerudo Cave" },
                { name: "South Gerudo Cave" },
                { name: "Ancient Altar Ruins" },
                { name: "Gerudo Great Skeleton" },
                { name: "West Gerudo Underground Ruins" },
                { name: "Meadela's Mantle Cave" },
                { name: "Mystathi's Shelf Cave" },
                { name: "Statue of the Eighth Heroine Cave" },
                // Faron (14)
                { name: "Lake Hylia Whirlpool Cave" },
                { name: "Cora Lakefront Cave" },
                { name: "Finra Woods Excavation Site" },
                { name: "Pagos Woods Excavation Site" },
                { name: "Floria River Upstream Excavation" },
                { name: "Puffer Beach Overhead Cave" },
                { name: "Komo Shoreline Cave" },
                { name: "Sarjon Woods Cave" },
                { name: "Ubota Point Cave" },
                { name: "Rassla Lake Cave" },
                { name: "Corta Lake Cave" },
                { name: "Mount Floria Cave" },
                { name: "Rodai Lakefront Tunnel" },
                { name: "Calora Lake Cave" },
                // East and West Necluda and Mount Lanayru (21)
                { name: "Popla Foothills Excavation Site Cave" },
                { name: "Tobio's Hollow Cave" },
                { name: "Dueling Peaks South Cave" },
                { name: "Dueling Peaks North Cave" },
                { name: "Sahasra Slope Cave" },
                { name: "Byroad to Lanayru Wetlands Cave" },
                { name: "Kakariko Village Cave" },
                { name: "Cucco Hideaway" },
                { name: "Lanayru Road East Cave" },
                { name: "Lanayru Road South Cave" },
                { name: "Robred Dropoff Cave" },
                { name: "Fort Hateno Cave" },
                { name: "Oakle's Navel Cave" },
                { name: "Retsam Forest Cave" },
                { name: "Walnot Mountain Cave" },
                { name: "Deepback Bay Cave" },
                { name: "Mapla Point Cave" },
                { name: "Atun Valley Cave" },
                { name: "Mount Dunsel Cave" },
                { name: "Cape Cales Cliffbase Cave" },
                { name: "Eventide Island Cave" },
                // Lanayru Great Spring (18)
                { name: "Bone Pond East Cave" },
                { name: "Tabahl Woods Cave" },
                { name: "Upland Zorana Mountainside Cave" },
                { name: "Upland Zorana Summit Cave" },
                { name: "Upland Zorana Byroad" },
                { name: "Ralis Channel" },
                { name: "Oren Bridge Cave" },
                { name: "Luto's Channel" },
                { name: "Cave Under Zora's Domain" },
                { name: "Upland Zorana Foothill Cave" },
                { name: "Pristine Sanctum" },
                { name: "Ploymus Mountain Cave" },
                { name: "Reservoir Lakefront Cavern" },
                { name: "Ancient Zora Waterworks" },
                { name: "Ulria Grotto South Cave" },
                { name: "Ulria Grotto East Cave" },
                { name: "Horon Lagoon Cave" },
                { name: "Tarm Point Cave" },
                // Akkala and Eldin (25)
                { name: "Pico Pond Cave" },
                { name: "Lake Ferona Cave" },
                { name: "West Restaurant Cave" },
                { name: "East Restaurant Cave" },
                { name: "Gorko Tunnel" },
                { name: "Southern Mine Cave" },
                { name: "Goronbi River Cave" },
                { name: "Death Mountain Foothill Cave" },
                { name: "YunoboCo HQ South Cave" },
                { name: "YunoboCo HQ East Cave" },
                { name: "Isle of Rabac Gallery" },
                { name: "Deplian Badlands Cave" },
                { name: "Lizard's Burrow" },
                { name: "Lake Darman Monster Den" },
                { name: "Death Mountain West Tunnel" },
                { name: "Death Mountain East Tunnel" },
                { name: "Lake Intenoch Cave" },
                { name: "Foothill Monster Den" },
                { name: "Cephla Lake Cave" },
                { name: "Akkala Citadel Ruins Cave" },
                { name: "Akkala Citadel Ruins Summit Cave" },
                { name: "Construction Site Cave" },
                { name: "Tarrey Town Tunnel" },
                { name: "Skull Lake Cave" },
                { name: "North Akkala Beach Cave" },
                // Great Hyrule Forest (2)
                { name: "Yiga Clan Maritta Branch" },
                { name: "Rauru Hillside Cave" }
            ]
        },
        {
            category: "Wells",
            items: [
                { name: "Carok Bridge Well" },
                { name: "Mount Gustaf Well" },
                { name: "Lookout Landing Well" },
                { name: "Mabe Village Ruins Well" },
                { name: "Mount Daphnes Well" },
                { name: "Hyrule Castle Town Ruins Well" },
                { name: "Bottomless Pond Well" },
                { name: "Rebonae Bridge Well" },
                { name: "Outskirt Hill Well" },
                { name: "Outskirt Stable Well" },
                { name: "Aquame Lake Well" },
                { name: "Riverside Stable Well" },
                { name: "Tabantha Village Ruins Well" },
                { name: "Rowan Plain Well" },
                { name: "Maritta Exchange Ruins Well" },
                { name: "Irch Plain Well" },
                { name: "Tabantha Bridge Stable Well" },
                { name: "New Serenne Stable Well" },
                { name: "Dronoc's Pass Well" },
                { name: "Wetland Stable Well" },
                { name: "Wetland Stable South Well" },
                { name: "Moor Garrison Ruins Well" },
                { name: "Zauz Island Well" },
                { name: "Goponga Village Ruins Well" },
                { name: "Lanayru Wetlands Well" },
                { name: "Rikoka Hills Well" },
                { name: "Kakariko Village Well" },
                { name: "South Nabi Lake Well" },
                { name: "Deya Village Ruins North Well" },
                { name: "Deya Village Ruins Well" },
                { name: "Deya Village Ruins East Well" },
                { name: "Deya Village Ruins South Well" },
                { name: "Hills of Baumer Well" },
                { name: "Popla Foothills North Well" },
                { name: "Popla Foothills South Well" },
                { name: "Haran Lakefront Well" },
                { name: "Highland Stable Well" },
                { name: "Lakeside Stable Well" },
                { name: "Woodland Stable Well" },
                { name: "Shadow Hamlet Ruins Well" },
                { name: "Foothill Stable Well" },
                { name: "Zelda's Secret Well" },
                { name: "Hateno Village South Well" },
                { name: "Hateno Village East Well" },
                { name: "Hateno Village West Well" },
                { name: "Hateno Village North Well" },
                { name: "Tabahl Woods Well" },
                { name: "Dueling Peaks Stable Well" },
                { name: "Lurelin Village Well" },
                { name: "Mount Nabooru Well" },
                { name: "Gerudo Canyon Well" },
                { name: "Kara Kara Bazaar Well" },
                { name: "Snowfield Stable Well" },
                { name: "Elma Knolls Well" },
                { name: "Rauru Settlement Ruins Well" },
                { name: "East Akkala Stable Well" },
                { name: "South Akkala Stable Well" },
                { name: "Construction Site Well" },
                { name: "All's Well Reward" }
            ]
        },
        {
            category: "Chasms",
            items: [
                // Akkala Highlands (3)
                { name: "East Akkala Plains Chasm" },
                { name: "South Akkala Plains Chasm" },
                { name: "Tingel Island Chasm" },
                // Deep Akkala (1)
                { name: "Skull Lake Chasm" },
                // Death Mountain (1)
                { name: "Death Mountain Chasm" },
                // Gerudo Highlands (5)
                { name: "Birida Lookout Chasm" },
                { name: "East Gerudo Chasm" },
                { name: "Gerudo Summit Chasm" },
                { name: "South Lomei Chasm" },
                { name: "Yiga Clan Hideout Chasm" },
                // Hyrule Field (10)
                { name: "Forest of Time Chasm" },
                { name: "Great Plateau East Chasm" },
                { name: "Great Plateau North Chasm" },
                { name: "Great Plateau South Chasm" },
                { name: "Great Plateau West Chasm" },
                { name: "Hyrule Castle Chasm" },
                { name: "Hyrule Castle Moat East Chasm" },
                { name: "Hyrule Castle Moat West Chasm" },
                { name: "Hyrule Field Chasm" },
                { name: "Mount Daphnes Chasm" },
                // Hyrule Ridge (1)
                { name: "Hyrule Ridge Chasm" },
                // Mount Lanayru (1)
                { name: "Naydra Snowfield Chasm" },
                // West Necluda (2)
                { name: "East Hill Chasm" },
                { name: "Hills of Baumer Chasm" },
                // Tabantha Frontier (2)
                { name: "North Lomei Chasm" },
                { name: "Rito Village Chasm" },
                // Lanayru Great Spring (1)
                { name: "Chasm Under Zora's Domain" },
                // Akkala Sea (1)
                { name: "Lomei Labyrinth Chasm" }
            ]
        },
        {
            category: "Towns, Settlements, and Stables",
            subcategories: [
                {
                    name: "Towns & Settlements",
                    items: [
                        { name: "Lookout Landing", type: "town" },
                        { name: "Kakariko Village", type: "town" },
                        { name: "Gerudo Town", type: "town" },
                        { name: "Hateno Village", type: "town" },
                        { name: "Rito Village", type: "town" },
                        { name: "Goron City", type: "town" },
                        { name: "Tarrey Town", type: "town" },
                        { name: "Zora's Domain", type: "town" },
                        { name: "Korok Forest", type: "town" },
                        { name: "Lurelin Village", type: "town" },
                        { name: "Kara Kara Bazaar", type: "settlement" },
                        { name: "Yiga Clan Hideout", type: "settlement" },
                        { name: "Flight Range", type: "settlement" },
                        { name: "Forgotten Temple", type: "settlement" },
                        { name: "YunoboCo HQ", type: "settlement" },
                        { name: "Southern Mine", type: "settlement" },
                        { name: "Bedrock Bistro", type: "settlement" },
                        { name: "Hudson Construction Site", type: "settlement" }
                    ]
                },
                {
                    name: "Stables",
                    items: [
                        { name: "Dueling Peaks Stable" },
                        { name: "Outskirt Stable" },
                        { name: "Riverside Stable" },
                        { name: "Wetland Stable" },
                        { name: "Highland Stable" },
                        { name: "Lakeside Stable" },
                        { name: "Gerudo Canyon Stable" },
                        { name: "Woodland Stable" },
                        { name: "Foothill Stable" },
                        { name: "Tabantha Bridge Stable" },
                        { name: "New Serenne Stable" },
                        { name: "Snowfield Stable" },
                        { name: "Lucky Clover Gazette" },
                        { name: "South Akkala Stable" },
                        { name: "East Akkala Stable" },
                        { name: "Lookout Landing Mini Stable" },
                        { name: "Gerudo Canyon Pass Mini Stable" }
                    ]
                }
            ]
        },
        {
            category: "Bargainer Statues",
            items: [
                { name: "Lookout Landing Bargainer Statue" },
                { name: "Great Abandoned Central Mine Bargainer Statue" },
                { name: "Plains Bargainer Statue" },
                { name: "Wellspring of Courage Bargainer Statue" },
                { name: "Wellspring of Wisdom Bargainer Statue" },
                { name: "Wellspring of Power Bargainer Statue" },
                { name: "Cliff Bargainer Statue" }
            ]
        },
        {
            category: "Device Dispensers",
            items: [
                // Surface (3)
                { name: "Gerudo Canyon Pass Device Dispenser" },
                { name: "Kakariko Village Device Dispenser" },
                { name: "Tarrey Town Device Dispenser" },
                // Depths (2)
                { name: "Mineru Construct Factory Device Dispenser" },
                { name: "Death Mountain Device Dispenser" },
                // Sky (25)
                { name: "Ijo-o Shrine Device Dispenser" },
                { name: "Taninoud Shrine Device Dispenser" },
                { name: "Ga-ahisas Shrine Device Dispenser" },
                { name: "Ganos Shrine Device Dispenser" },
                { name: "Taunhiy Shrine Device Dispenser" },
                { name: "Mayasiar Shrine Device Dispenser" },
                { name: "Rakashog Shrine Device Dispenser" },
                { name: "Jinodok Shrine Device Dispenser" },
                { name: "Kadaunar Shrine Device Dispenser" },
                { name: "Gikaku Shrine Device Dispenser" },
                { name: "Natak Shrine Device Dispenser" },
                { name: "Jirutagumac Shrine Device Dispenser" },
                { name: "Igoshon Shrine Device Dispenser" },
                { name: "Sihajog Shrine Device Dispenser" },
                { name: "Mayanas Shrine Device Dispenser" },
                { name: "Kumamayn Shrine Device Dispenser" },
                { name: "Yansamin Shrine Device Dispenser" },
                { name: "Ukoojisi Shrine Device Dispenser" },
                { name: "Mayam Shrine Device Dispenser" },
                { name: "Simosiwak Shrine Device Dispenser" },
                { name: "Josiu Shrine Device Dispenser" },
                { name: "Joku-u Shrine Device Dispenser" },
                { name: "Joku-usin Shrine Device Dispenser" },
                { name: "Nachoyah Shrine Device Dispenser" },
                { name: "Gutanbac Shrine Device Dispenser" }
            ]
        },
        {
            category: "Forge/Weapon Constructs and Refineries",
            items: [
                // Sky (2)
                { name: "Room of Awakening Crystal Refinery" },
                { name: "Room of Awakening Forge Construct" },
                // Surface (1)
                { name: "Lookout Landing Crystal Refinery" },
                // Depths (11)
                { name: "Spirit Temple Smithing Construct" },
                { name: "Great Abandoned Central Mine Forge Construct" },
                { name: "Abandoned Gerudo Mine Forge Construct" },
                { name: "Abandoned Kara Kara Mine Forge Construct" },
                { name: "Abandoned Kakariko Mine Forge Construct" },
                { name: "Abandoned Lurelin Mine Forge Construct" },
                { name: "Abandoned Hateno Mine Forge Construct" },
                { name: "Abandoned Lanayru Mine Forge Construct" },
                { name: "Abandoned Tarrey Mine Forge Construct" },
                { name: "Abandoned Eldin Mine Forge Construct" },
                { name: "Abandoned Hebra Mine Forge Construct" }
            ]
        },
        {
            category: "Great Fairies",
            items: [
                { name: "Great Fairy Tera" },
                { name: "Great Fairy Kaysa" },
                { name: "Great Fairy Cotera" },
                { name: "Great Fairy Mija" },
                { name: "Horse God Malanya" }
            ]
        },
        // NEW: Hyrule Compendium Category
        {
            category: "Hyrule Compendium",
            subcategories: [
                {
                    name: "Creatures",
                    items: [
                        "001 Horse", "002 Giant Horse", "003 White Horse", "004 Giant White Stallion", "005 Golden Horse",
                        "006 Stalhorse", "007 Donkey", "008 Sand Seal", "009 Patricia", "010 Bushy-Tailed Squirrel",
                        "011 Woodland Boar", "012 Red-Tusked Boar", "013 Mountain Goat", "014 White Goat",
                        "015 Mountain Buck", "016 Mountain Doe", "017 Water Buffalo", "018 Hateno Cow",
                        "019 Highland Sheep", "020 Grassland Fox", "021 Snowcoat Fox", "022 Maraudo Wolf",
                        "023 Wasteland Coyote", "024 Cold-Footed Wolf", "025 Tabantha Moose", "026 Dondon",
                        "027 Honeyvore Bear", "028 Grizzlemaw Bear", "029 Hylian Retriever", "030 Blupee",
                        "031 Bubbulfrog", "032 Common Sparrow", "033 Red Sparrow", "034 Blue Sparrow",
                        "035 Rainbow Sparrow", "036 Sand Sparrow", "037 Golden Sparrow", "038 Wood Pigeon",
                        "039 Rainbow Pigeon", "040 Hotfeather Pigeon", "041 White Pigeon", "042 Accented Pigeon",
                        "043 Mountain Crow", "044 Bright-Chested Duck", "045 Blue-Winged Heron", "046 Pink Heron",
                        "047 Islander Hawk", "048 Seagull", "049 Cloud Seagull", "050 Eldin Ostrich",
                        "051 Forest Ostrich", "052 Cucco", "053 Hyrule Bass", "054 Hearty Bass",
                        "055 Staminoka Bass", "056 Hearty Salmon", "057 Chillfin Trout", "058 Sizzlefin Trout",
                        "059 Voltfin Trout", "060 Stealthfin Trout", "061 Mighty Carp", "062 Armored Carp",
                        "063 Sanke Carp", "064 Ancient Arowana", "065 Glowing Cave Fish", "066 Mighty Porgy",
                        "067 Armored Porgy", "068 Sneaky River Snail", "069 Razorclaw Crab", "070 Ironshell Crab",
                        "071 Bright-Eyed Crab", "072 Fairy", "073 Winterwing Butterfly", "074 Summerwing Butterfly",
                        "075 Thunderwing Butterfly", "076 Smotherwing Butterfly", "077 Cold Darner", "078 Warm Darner",
                        "079 Electric Darner", "080 Restless Cricket", "081 Bladed Rhino Beetle", "082 Rugged Rhino Beetle",
                        "083 Energetic Rhino Beetle", "084 Sunset Firefly", "085 Deep Firefly", "086 Hot-Footed Frog",
                        "087 Tireless Frog", "088 Sticky Frog", "089 Hightail Lizard", "090 Hearty Lizard",
                        "091 Fireproof Lizard", "092 Sticky Lizard"
                    ]
                },
                {
                    name: "Monsters",
                    items: [
                        "093 Chuchu", "094 Fire Chuchu", "095 Ice Chuchu", "096 Electric Chuchu", "097 Keese",
                        "098 Fire Keese", "099 Ice Keese", "100 Electric Keese", "101 Water Octorok", "102 Forest Octorok",
                        "103 Rock Octorok", "104 Snow Octorok", "105 Treasure Octorok", "106 Fire Wizzrobe",
                        "107 Ice Wizzrobe", "108 Electric Wizzrobe", "109 Meteo Wizzrobe", "110 Blizzrobe",
                        "111 Thunder Wizzrobe", "112 Like Like", "113 Fire Like", "114 Ice Like",
                        "115 Shock Like", "116 Rock Like", "117 Evermean", "118 Aerocuda",
                        "119 Gibdo", "120 Moth Gibdo", "121 Bokoblin", "122 Blue Bokoblin",
                        "123 Black Bokoblin", "124 Stalkoblin", "125 Silver Bokoblin", "126 Boss Bokoblin",
                        "127 Blue Boss Bokoblin", "128 Black Boss Bokoblin", "129 Silver Boss Bokoblin", "130 Moblin",
                        "131 Blue Moblin", "132 Black Moblin", "133 Stalmoblin", "134 Silver Moblin",
                        "135 Lizalfos", "136 Blue Lizalfos", "137 Black Lizalfos", "138 Stalizalfos",
                        "139 Fire-Breath Lizalfos", "140 Ice-Breath Lizalfos", "141 Electric Lizalfos", "142 Silver Lizalfos",
                        "143 Horriblin", "144 Blue Horriblin", "145 Black Horriblin", "146 Silver Horriblin",
                        "147 Lynel", "148 Blue-Maned Lynel", "149 White-Maned Lynel", "150 Silver Lynel",
                        "151 Soldier Construct I", "152 Soldier Construct II", "153 Soldier Construct III", "154 Soldier Construct IV",
                        "155 Captain Construct I", "156 Captain Construct II", "157 Captain Construct III", "158 Captain Construct IV",
                        "159 Training Construct", "160 Flux Construct I", "161 Flux Construct II", "162 Flux Construct III",
                        "163 Yiga Footsoldier", "164 Yiga Blademaster", "165 Master Kohga", "166 Stone Pebblit",
                        "167 Igneo Pebblit", "168 Frost Pebblit", "169 Stone Talus", "170 Stone Talus (Luminous)",
                        "171 Stone Talus (Rare)", "172 Battle Talus", "173 Igneo Talus", "174 Frost Talus",
                        "175 Hinox", "176 Blue Hinox", "177 Black Hinox", "178 Stalnox",
                        "179 Molduga", "180 Flame Gleeok", "181 Frost Gleeok", "182 Thunder Gleeok",
                        "183 King Gleeok", "184 Little Frox", "185 Frox", "186 Obsidian Frox",
                        "187 Blue-White Frox", "188 Dinraal", "189 Naydra", "190 Farosh",
                        "191 Colgera", "192 Moragia", "193 Marbled Gohma", "194 Sludge Like",
                        "195 Mucktorok", "196 Queen Gibdo", "197 Seized Construct", "198 Phantom Ganon",
                        "199 Demon King Ganondorf", "200 Demon King Ganondorf (2nd Form)", "201 Demon Dragon", "202 Light Dragon"
                    ]
                },
                {
                    name: "Materials",
                    items: [
                        "203 Apple", "204 Golden Apple", "205 Palm Fruit", "206 Wildberry", "207 Hylian Tomato",
                        "208 Hydromelon", "209 Spicy Pepper", "210 Voltfruit", "211 Fleet-Lotus Seeds", "212 Mighty Bananas",
                        "213 Fire Fruit", "214 Ice Fruit", "215 Splash Fruit", "216 Shock Fruit", "217 Dazzlefruit",
                        "218 Hylian Shroom", "219 Sky Shroom", "220 Endura Shroom", "221 Stamella Shroom", "222 Hearty Truffle",
                        "223 Big Hearty Truffle", "224 Chillshroom", "225 Sunshroom", "226 Zapshroom", "227 Rushroom",
                        "228 Razorshroom", "229 Ironshroom", "230 Silent Shroom", "231 Brightcap", "232 Puffshroom",
                        "233 Hyrule Herb", "234 Stambulb", "235 Hearty Radish", "236 Big Hearty Radish", "237 Cool Safflina",
                        "238 Warm Safflina", "239 Electric Safflina", "240 Swift Carrot", "241 Endura Carrot", "242 Fortified Pumpkin",
                        "243 Sun Pumpkin", "244 Swift Violet", "245 Mighty Thistle", "246 Armoranth", "247 Blue Nightshade",
                        "248 Sundelion", "249 Brightbloom Seed", "250 Giant Brightbloom Seed", "251 Muddle Bud", "252 Bomb Flower",
                        "253 Silent Princess", "254 Courser Bee Honey", "255 Hylian Pine Cone", "256 Korok Frond", "257 Chuchu Jelly",
                        "258 Red Chuchu Jelly", "259 White Chuchu Jelly", "260 Yellow Chuchu Jelly", "261 Keese Eyeball",
                        "262 Fire Keese Eyeball", "263 Ice Keese Eyeball", "264 Electric Keese Eyeball", "265 Like Like Stone",
                        "266 Fire Like Stone", "267 Ice Like Stone", "268 Shock Like Stone", "269 Aerocuda Eyeball",
                        "270 Gibdo Bone", "271 Bokoblin Horn", "272 Blue Bokoblin Horn", "273 Black Bokoblin Horn",
                        "274 Silver Bokoblin Horn", "275 Boss Bokoblin Horn", "276 Blue Boss Bokoblin Horn", "277 Black Boss Bokoblin Horn",
                        "278 Silver Boss Bokoblin Horn", "279 Moblin Horn", "280 Blue Moblin Horn", "281 Black Moblin Horn",
                        "282 Silver Moblin Horn", "283 Lizalfos Horn", "284 Blue Lizalfos Horn", "285 Black Lizalfos Horn",
                        "286 Fire-Breath Lizalfos Horn", "287 Ice-Breath Lizalfos Horn", "288 Electric Lizalfos Horn", "289 Silver Lizalfos Horn",
                        "290 Horriblin Horn", "291 Blue Horriblin Horn", "292 Black Horriblin Horn", "293 Silver Horriblin Horn",
                        "294 Lynel Saber Horn", "295 Lynel Mace Horn", "296 Blue-Maned Lynel Saber Horn", "297 Blue-Maned Lynel Mace Horn",
                        "298 White-Maned Lynel Saber Horn", "299 White-Maned Lynel Mace Horn", "300 Silver Lynel Saber Horn", "301 Silver Lynel Mace Horn",
                        "302 Soldier Construct Horn", "303 Soldier Construct II Horn", "304 Soldier Construct III Horn", "305 Soldier Construct IV Horn",
                        "306 Captain Construct I Horn", "307 Captain Construct II Horn", "308 Captain Construct III Horn", "309 Captain Construct IV Horn",
                        "310 Hinox Horn", "311 Blue Hinox Horn", "312 Black Hinox Horn", "313 Stalnox Horn",
                        "314 Molduga Jaw", "315 Gleeok Flame Horn", "316 Gleeok Frost Horn", "317 Gleeok Thunder Horn",
                        "318 Frox Fang", "319 Obsidian Frox Fang", "320 Blue-White Frox Fang", "321 Dinraal's Horn",
                        "322 Shard of Dinraal's Spike", "323 Naydra's Horn", "324 Shard of Naydra's Spike", "325 Farosh's Horn",
                        "326 Shard of Farosh's Spike", "327 Light Dragon's Horn", "328 Shard of Light Dragon's Spike"
                    ]
                },
                {
                    name: "Equipment",
                    items: [
                        "329 Master Sword", "330 Tree Branch", "331 Torch", "332 Soup Ladle", "333 Boomerang",
                        "334 Boomerang ✨", "335 Sea-Breeze Boomerang", "336 Traveler's Sword", "337 Traveler's Sword ✨",
                        "338 Soldier's Broadsword", "339 Soldier's Broadsword ✨", "340 Knight's Broadsword", "341 Knight's Broadsword ✨",
                        "342 Royal Broadsword", "343 Royal Broadsword ✨", "344 Forest Dweller's Sword", "345 Forest Dweller's Sword ✨",
                        "346 Zora Sword", "347 Zora Sword ✨", "348 Feathered Edge", "349 Feathered Edge ✨",
                        "350 Gerudo Scimitar", "351 Gerudo Scimitar ✨", "352 Scimitar of the Seven", "353 Eightfold Blade",
                        "354 Eightfold Blade ✨", "355 Rusty Broadsword", "356 Sword of the Hero", "357 Royal Guard's Sword",
                        "358 Royal Guard's Sword ✨", "359 White Sword of the Sky", "360 Wooden Stick", "361 Sturdy Wooden Stick",
                        "362 Gnarled Wooden Stick", "363 Lizal Boomerang", "364 Zonaite Sword", "365 Strong Zonaite Sword",
                        "366 Mighty Zonaite Sword", "367 Magic Rod", "368 Bokoblin Arm", "369 Lizalfos Arm",
                        "370 Gloom Sword", "371 Farming Hoe", "372 Boat Oar", "373 Giant Boomerang",
                        "374 Giant Boomerang ✨", "375 Traveler's Claymore", "376 Traveler's Claymore ✨", "377 Soldier's Claymore",
                        "378 Soldier's Claymore ✨", "379 Knight's Claymore", "380 Knight's Claymore ✨", "381 Royal Claymore",
                        "382 Royal Claymore ✨", "383 Zora Longsword", "384 Zora Longsword ✨", "385 Cobble Crusher",
                        "386 Cobble Crusher ✨", "387 Boulder Breaker", "388 Biggoron's Sword", "389 Gerudo Claymore",
                        "390 Gerudo Claymore ✨", "391 Eightfold Longblade", "392 Eightfold Longblade ✨", "393 Dusk Claymore",
                        "394 Fierce Deity Sword", "395 Rusty Claymore", "396 Royal Guard's Claymore", "397 Royal Guard's Claymore ✨",
                        "398 Thick Stick", "399 Sturdy Thick Stick", "400 Gnarled Thick Stick", "401 Zonaite Longsword",
                        "402 Strong Zonaite Longsword", "403 Mighty Zonaite Longsword", "404 Magic Scepter", "405 Moblin Arm",
                        "406 Gloom Club", "407 Wooden Mop", "408 Farmer's Pitchfork", "409 Fishing Harpoon",
                        "410 Throwing Spear", "411 Throwing Spear ✨", "412 Traveler's Spear", "413 Traveler's Spear ✨",
                        "414 Soldier's Spear", "415 Soldier's Spear ✨", "416 Knight's Halberd", "417 Knight's Halberd ✨",
                        "418 Royal Halberd", "419 Royal Halberd ✨", "420 Forest Dweller's Spear", "421 Forest Dweller's Spear ✨",
                        "422 Zora Spear", "423 Zora Spear ✨", "424 Lightscale Trident", "425 Feathered Spear",
                        "426 Feathered Spear ✨", "427 Gerudo Spear", "428 Gerudo Spear ✨", "429 Rusty Halberd",
                        "430 Royal Guard's Spear", "431 Royal Guard's Spear ✨", "432 Long Stick", "433 Sturdy Long Stick",
                        "434 Gnarled Long Stick", "435 Zonaite Spear", "436 Strong Zonaite Spear", "437 Mighty Zonaite Spear",
                        "438 Magic Staff", "439 Gloom Spear", "440 Arrow", "441 Old Wooden Bow",
                        "442 Wooden Bow", "443 Traveler's Bow", "444 Soldier's Bow", "445 Knight's Bow",
                        "446 Royal Bow", "447 Forest Dweller's Bow", "448 Zora Bow", "449 Swallow Bow",
                        "450 Falcon Bow", "451 Great Eagle Bow", "452 Gerudo Bow", "453 Phrenic Bow",
                        "454 Royal Guard's Bow", "455 Dusk Bow", "456 Boko Bow", "457 Spiked Boko Bow",
                        "458 Dragonbone Boko Bow", "459 Lizal Bow", "460 Strengthened Lizal Bow", "461 Steel Lizal Bow",
                        "462 Lynel Bow", "463 Mighty Lynel Bow", "464 Savage Lynel Bow", "465 Duplex Bow",
                        "466 Construct Bow", "467 Strong Construct Bow", "468 Mighty Construct Bow", "469 Zonaite Bow",
                        "470 Demon King's Bow", "471 Hylian Shield", "472 Pot Lid", "473 Old Wooden Shield",
                        "474 Wooden Shield", "475 Emblazoned Shield", "476 Hunter's Shield", "477 Fisherman's Shield",
                        "478 Traveler's Shield", "479 Soldier's Shield", "480 Knight's Shield", "481 Royal Shield",
                        "482 Forest Dweller's Shield", "483 Zora Shield", "484 Kite Shield", "485 Gerudo Shield",
                        "486 Radiant Shield", "487 Daybreaker", "488 Shield of the Mind's Eye", "489 Sea-Breeze Shield",
                        "490 Rusty Shield", "491 Royal Guard's Shield", "492 Boko Shield", "493 Spiked Boko Shield",
                        "494 Dragonbone Boko Shield", "495 Lizal Shield", "496 Reinforced Lizal Shield", "497 Steel Lizal Shield",
                        "498 Zonaite Shield", "499 Strong Zonaite Shield", "500 Mighty Zonaite Shield", "501 Lynel Shield",
                        "502 Mighty Lynel Shield", "503 Savage Lynel Shield"
                    ]
                },
                {
                    name: "Treasure",
                    items: [
                        "504 Treasure Chest", "505 Ore Deposit", "506 Rare Ore Deposit", "507 Luminous Stone Deposit", "508 Zonaite Deposit",
                        "509 Well"
                    ]
                }
            ]
        }
    ];

    const questsData = [
        {
            category: "Main Quests",
            items: [
                { name: "Find Princess Zelda" },
                { name: "The Closed Door" },
                { name: "To the Kingdom of Hyrule" },
                { name: "Crisis at Hyrule Castle" },
                { name: "Regional Phenomena" },
                { name: "Camera Work In the Depths" },
                { name: "Impa and the Geoglyphs" },
                { name: "The Dragon's Tears" },
                { name: "A Mystery in the Depths" },
                { name: "Tulin of Rito Village" },
                { name: "Yunobo of Goron City" },
                { name: "The Sludge-Covered Statue" },
                { name: "Sidon of the Zora" },
                { name: "Restoring the Zora Armor" },
                { name: "The Broken Slate" },
                { name: "Clues to the Sky" },
                { name: "Riju of Gerudo Town" },
                { name: "Find the Fifth Sage" },
                { name: "Secret of the Ring Ruins" },
                { name: "Guidance from Ages Past" },
                { name: "Trail of the Master Sword" },
                { name: "Recovering the Hero's Sword" },
                { name: "Destroy Ganondorf" }
            ]
        },
        {
            category: "Side Adventures",
            items: [
                { name: "Hateno Village Research Lab", location: "Lookout Landing, Central Hyrule" },
                { name: "Filling Out the Compendium", location: "Hateno Village, Mount Lanayru" },
                { name: "Presenting: The Travel Medallion!", location: "Hateno Village, Mount Lanayru" },
                { name: "Presenting: Hero's Path Mode!", location: "Hateno Village, Mount Lanayru" },
                { name: "Presenting: Sensor +!", location: "Hateno Village, Mount Lanayru" },
                { name: "Mattison's Independence", location: "Tarrey Town, Akkala" },
                { name: "A Letter to Koyin", location: "Hateno Village's Lake Sumac" },
                { name: "A New Signature Food", location: "Hateno Village" },
                { name: "Reede's Secret", location: "Hateno Village" },
                { name: "Cece's Secret", location: "Hateno Village" },
                { name: "Team Cece or Team Reede?", location: "Hateno Village Clothing Shop" },
                { name: "The Mayoral Election", location: "Hateno Village" },
                { name: "Ruffian-Infested Village", location: "Sifimum Shrine, East Necluda" },
                { name: "Lurelin Village Restoration Project", location: "Lurelin Village, East Necluda" },
                { name: "Potential Princess Sightings!", location: "Lucky Clover Gazette, Tabantha Frontier" },
                { name: "The Beckoning Woman", location: "Outskirt Stable, Central Hyrule" },
                { name: "Gourmets Gone Missing", location: "Riverside Stable, Central Hyrule" },
                { name: "The Beast and the Princess", location: "New Serenne Stable, Hyrule Ridge" },
                { name: "Zelda's Golden Horse", location: "Snowfield Stable, Tabantha Tundra" },
                { name: "White Goats Gone Missing", location: "Tabantha Bridge Stable, Hyrule Ridge" },
                { name: "For Our Princess!", location: "Foothill Stable, Eldin" },
                { name: "The All-Clucking Cucco", location: "South Akkala Stable, Akkala" },
                { name: "The Missing Farm Tools", location: "Wetlands Stable, West Necluda" },
                { name: "Princess Zelda Kidnapped?!", location: "Dueling Peaks Stable, West Necluda" },
                { name: "An Eerie Voice", location: "Highland Stable, Faron" },
                { name: "The Blocked Well", location: "Gerudo Canyon Stable, Gerudo" },
                { name: "The Flute Player's Plan", location: "Highland Stable, Faron" },
                { name: "Honey, Bee Mine", location: "West Necluda" },
                { name: "The Hornist's Dramatic Escape", location: "Tabantha Frontier" },
                { name: "Serenade to a Great Fairy", location: "Woodland Stable, Eldin Canyon" },
                { name: "Serenade to Kaysa", location: "Outskirt Stable, Central Hyrule" },
                { name: "Serenade to Cotera", location: "Dueling Peaks Stable, West Necluda" },
                { name: "Serenade to Mija", location: "Snowfield Stable, Tabantha Tundra" },
                { name: "Bring Peace to Hyrule Field!", location: "Central Hyrule" },
                { name: "Bring Peace to Necluda!", location: "West Necluda" },
                { name: "Bring Peace to Eldin!", location: "North of Death Mountain" },
                { name: "Bring Peace to Akkala!", location: "North of Death Mountain" },
                { name: "Bring Peace to Faron!", location: "Pirate Ship West of Highland Stable, Faron" },
                { name: "Bring Peace to Hebra!", location: "Tabantha Tundra, South Tabantha Snowfield" },
                { name: "Hestu's Concerns", location: "Hyrule Ridge" },
                { name: "The Hunt for Bubbul Gems", location: "Woodland Stable, Eldin Canyon" },
                { name: "The Search for Koltin", location: "Tarrey Town, Akkala" },
                { name: "A Monstrous Collection I", location: "Tarrey Town, Akkala" },
                { name: "A Monstrous Collection II", location: "Tarrey Town, Akkala" },
                { name: "A Monstrous Collection III", location: "Tarrey Town, Akkala" },
                { name: "A Monstrous Collection IV", location: "Tarrey Town, Akkala" },
                { name: "A Monstrous Collection V", location: "Tarrey Town, Akkala" },
                { name: "Investigate the Thyphlo Ruins", location: "Thyphlo Ruins" },
                { name: "The Owl Protected by Dragons", location: "Thyphlo Ruins" },
                { name: "The Corridor between Two Dragons", location: "Thyphlo Ruins" },
                { name: "The Six Dragons", location: "Thyphlo Ruins" },
                { name: "The Long Dragon", location: "Thyphlo Ruins" },
                { name: "Messages from an Ancient Era", location: "Lookout Landing, Central Hyrule" },
                { name: "A Deal With the Statue", location: "Royal Hidden Passage, Central Hyrule" },
                { name: "Who Goes There?", location: "Lookout Landing, Central Hyrule" },
                { name: "A Call from the Depths", location: "Great Plateau" },
                { name: "Infiltrating the Yiga Clan", location: "Yiga Clan Hideout, Gerudo Highland" },
                { name: "The Yiga Clan Exam", location: "Yiga Blademaster Station, Gerudo Highland" },
                { name: "Master Kohga of the Yiga Clan", location: "Great Abandoned Central Mine" },
                { name: "Legend of the Great Sky Island", location: "Great Sky Island" }
            ]
        },
        {
            category: "Side Quests",
            items: [
                { name: "A Bottled Cry for Help", location: "Hateno Beach - East Necluda" },
                { name: "A Crabulous Deal", location: "Zora's Domain (After clearing Sidon of the Zora)" },
                { name: "A New Champion's Tunic", location: "Hateno Village - Zelda's House" },
                { name: "A Picture for Dueling Peaks Stable", location: "Dueling Peaks Stable" },
                { name: "A Picture for East Akkala Stable", location: "East Akkala Stable" },
                { name: "A Picture for Foothill Stable", location: "Foothill Stable" },
                { name: "A Picture for Highland Stable", location: "Highland Stable" },
                { name: "A Picture for Lakeside Stable", location: "Lakeside Stable" },
                { name: "A Picture for New Serenne Stable", location: "New Serenne Stable" },
                { name: "A Picture for Outskirt Stable", location: "Outskirt Stable" },
                { name: "A Picture for Riverside Stable", location: "Riverside Stable" },
                { name: "A Picture for Snowfield Stable", location: "Snowfield Stable" },
                { name: "A Picture for South Akkala Stable", location: "South Akkala Stable" },
                { name: "A Picture for Tabantha Bridge Stable", location: "Tabantha Bridge Stable" },
                { name: "A Picture for the Closed Stable I", location: "Gerudo Canyon Stable" },
                { name: "A Picture for the Closed Stable II", location: "Gerudo Canyon Stable" },
                { name: "A Picture for Wetland Stable", location: "Wetland Stable" },
                { name: "A Picture for Woodland Stable", location: "Woodland Stable" },
                { name: "A Token of Friendship", location: "Zora's Domain (After clearing Sidon of the Zora)" },
                { name: "A Trip through History", location: "Kakariko Village" },
                { name: "A Way to Trade, Washed Away", location: "Lurelin Village (after Lurelin Village Restoration Project is complete)" },
                { name: "A Wife Wafted Away", location: "Zora's Domain (After clearing Sidon of the Zora)" },
                { name: "Amber Dealer", location: "Goron City" },
                { name: "An Uninvited Guest", location: "Wetland Stable" },
                { name: "Ancient Blades Below", location: "Spirit Temple - Depths" },
                { name: "Cash In on Ripened Flint", location: "Bedrock Bistro - Eldin" },
                { name: "Cave Mushrooms That Glow", location: "Tabantha Frontier" },
                { name: "Codger's Quarrel", location: "Kakariko Village" },
                { name: "Cold-Endurance Contest!", location: "Gerudo Canyon" },
                { name: "Crossing the Cold Pool", location: "Talonto Peak Cave - Hebra Mountains" },
                { name: "Dad's Blue Shirt", location: "Lurelin Village (after Lurelin Village Restoration Project is complete)" },
                { name: "Dalia's Game", location: "Gerudo Town (After completing Riju of Gerudo Town)" },
                { name: "Dantz's Prize Cows", location: "Hateno Village" },
                { name: "Decorate With Passion", location: "Kara Kara Bazaar - Gerduo Desert (After completing Riju of Gerudo Town)" },
                { name: "Disaster in Gerudo Canyon", location: "Gerudo Canyon Pass" },
                { name: "Eldin's Colossal Fossil", location: "East Akkala Stable" },
                { name: "Feathered Fugitives", location: "Riverside Stable" },
                { name: "Fell into a Well!", location: "Rebonae Bridge Well - Hyrule Field" },
                { name: "Fish for Fletching", location: "Rito Village (After completing Tulin of Rito Village)" },
                { name: "Follow the Cuccos", location: "Kakariko Village" },
                { name: "Genli's Home Cooking", location: "Rito Village (After completing Tulin of Rito Village)" },
                { name: "Gerudo's Colossal Fossil", location: "Hebra Great Skeleton - Hebra Mountains" },
                { name: "Gleeok Guts", location: "Gerudo Canyon Stable" },
                { name: "Gloom-Borne Illness", location: "Kakariko Village" },
                { name: "Glory of the Zora", location: "Zora's Domain (After clearing Sidon of the Zora)" },
                { name: "Goddess Statue of Power", location: "Spring of Power - Akkala" },
                { name: "Goddess Statue of Courage", location: "Spring of Courage - West Necluda" },
                { name: "Goddess Statue of Wisdom", location: "Spring of Wisdom - Mount Lanayru" },
                { name: "Heat-Endurance Contest!", location: "Mount Granajh - Gerudo Canyon (After completing Cold-Endurance Contest!)" },
                { name: "Hebra's Colossal Fossil", location: "Eldin Great Skeleton - Eldin" },
                { name: "Home on Arrange", location: "Tarrey Town" },
                { name: "Homegrown in Hateno", location: "Hateno Village (After completing The Mayoral Election)" },
                { name: "Horse-Drawn Dreams", location: "New Serenne Stable" },
                { name: "Kaneli's Flight Training", location: "Flight Range - Tanatha Frontier" },
                { name: "Legacy of the Rito", location: "Rito Village (After completing Tulin of Rito Village)" },
                { name: "Lost in the Dunes", location: "Kara Kara Bazaar - Gerduo Desert (After completing Riju of Gerudo Town)" },
                { name: "Lurelin Resort Project", location: "Lurelin Village (after Lurelin Village Restoration Project is complete)" },
                { name: "Manny's Beloved", location: "Hateno Village" },
                { name: "Master the Vehicle Prototype", location: "Hudson Construction Site - Akkala" },
                { name: "Meat for Meat", location: "Bedrock Bistro - Eldin" },
                { name: "Mine-Cart Land: Death Mountain", location: "Death Mountain - Eldin (Must complete Southern Mine quests first)" },
                { name: "Mine-Cart Land: Open for Business!", location: "Southern Mine - Eldin" },
                { name: "Mine-Cart Land: Quickshot Course", location: "Southern Mine - Eldin" },
                { name: "Mired in Muck", location: "Upland Zorana Skyview Tower" },
                { name: "Misko's Cave of Chests", location: "Cephla Lake Cave - Eldin" },
                { name: "Misko's Treasure of Awakening I", location: "Goronbi River Cave - Eldin" },
                { name: "Misko's Treasure of Awakening II", location: "Ancient Columns Cave - Tabantha Frontier" },
                { name: "Misko's Treasure of Awakening III", location: "Coliseum Ruins Cave - Hyrule Ridge" },
                { name: "Misko's Treasure: Heroines Manuscript", location: "Cephla Lake Cave - Eldin" },
                { name: "Misko's Treasure: Pirate Manuscript", location: "Cephla Lake Cave - Eldin" },
                { name: "Misko's Treasure: The Fierce Deity", location: "Cephla Lake Cave - Eldin" },
                { name: "Misko's Treasure: Twin Manuscripts", location: "Cephla Lake Cave - Eldin" },
                { name: "Molli the Fletcher's Quest", location: "Rito Village (After completing Tulin of Rito Village)" },
                { name: "Moon-Gazing Gorons", location: "Goron City (After completing Yunobo of Goron City)" },
                { name: "One-Hit Wonder!", location: "South Akkala Stable" },
                { name: "Open the Door", location: "Tabantha Village Ruins - Tabantha Frontier" },
                { name: "Ousting the Giants", location: "Lakeside Stable" },
                { name: "Out of the Inn", location: "Kakariko Village" },
                { name: "Photographing a Chuchu", location: "Hateno Village" },
                { name: "Piaffe, Packed Away", location: "Gerudo Canyon Stable" },
                { name: "Pride of the Gerudo", location: "Gerudo Town (After completing Riju of Gerudo Town)" },
                { name: "Rattled Ralera", location: "Lurelin Village (after Lurelin Village Restoration Project is complete)" },
                { name: "Rock Roast or Dust", location: "Bedrock Bistro - Eldin" },
                { name: "Secret Treasure under the Great Fish", location: "Zora's Domain (After clearing Sidon of the Zora)" },
                { name: "Secrets Within", location: "Tarrey Town" },
                { name: "Seeking the Pirate Hideout", location: "Eventide Island - Necluda Sea" },
                { name: "Simmerstone Springs", location: "Goron City (After completing Yunobo of Goron City)" },
                { name: "Soul of the Gorons", location: "Goron City (After completing Yunobo of Goron City)" },
                { name: "Spotting Spot", location: "Lookout Landing" },
                { name: "Strongest in the World", location: "East Akkala Stable" },
                { name: "Supply-Eyeing Fliers", location: "Tabantha Village Ruins - Tabantha Frontier" },
                { name: "Teach Me a Lesson I", location: "Hateno School - Hateno Village" },
                { name: "Teach Me a Lesson II", location: "Hateno School - Hateno Village (After Teach Me a Lesson I)" },
                { name: "The Abandoned Laborer", location: "Death Mountain West Tunnel - Eldin" },
                { name: "The Ancient City Gondoria?", location: "Goron City (after The Ancient City Gondoria!)" },
                { name: "The Ancient City Gorondia!", location: "Goron City" },
                { name: "The Blocked Cave", location: "Hebra Mountains" },
                { name: "The Blue Stone", location: "East Reservoir Lake - Lanayru Region" },
                { name: "The Captured Tent", location: "Snowfield Stable" },
                { name: "The Duchess Who Disappeared", location: "Biron Snowshelf, Hebra Tundra - Hebra Mountains" },
                { name: "The Fort at Ja'Abu Ridge", location: "Zora's Domain (After clearing Sidon of the Zora)" },
                { name: "The Gathering Pirates", location: "East Akkala Stable" },
                { name: "The Great Tumbleweed Purge", location: "Oseria Plains, Gerudo Canyon - Gerudo Highlands" },
                { name: "The Heroines' Secret", location: "Gerudo Shelter - Gerudo Town (After completing Riju of Gerudo Town)" },
                { name: "The Hidden Treasure at Lizard Lakes", location: "Goron City (After completing Yunobo of Goron City)" },
                { name: "The Horse Guard's Request", location: "Outskirt Stable" },
                { name: "The Iceless Icehouse", location: "Northern Icehouse - Gerudo Desert" },
                { name: "The Incomplete Stable", location: "Lookout Landing" },
                { name: "The Lomei Labyrinth Island Prophecy", location: "Lomei Labyrinth Island - Akkala" },
                { name: "The Missing Owner", location: "Gerudo Town (After completing Riju of Gerudo Town)" },
                { name: "The Moonlit Princess", location: "Zora's Domain (After clearing Sidon of the Zora)" },
                { name: "The Mother Goddess Statue", location: "Forgotten Temple - Tabantha Frontier (Complete all Goddess Statue Side Quests)" },
                { name: "The Mysterious Eighth", location: "Gerudo Shelter - Gerudo Town (After Completing The Heroines' Secret)" },
                { name: "The Never-Ending Lecture", location: "Zora's Domain" },
                { name: "The North Lomei Prophecy", location: "North Lomei Labyrinth - Hebra Mountains" },
                { name: "The Rito Rope Bridge", location: "The Lucky Clover Gazette - Tabantha Frontier (After completing Tulin of Rito Village)" },
                { name: "The Secret Room", location: "Korok Forest" },
                { name: "The Shrine Explorer", location: "Complete the final (152nd) Shrine of Light" },
                { name: "The South Lomei Prophecy", location: "South Lomei Labyrinth - Gerudo Desert" },
                { name: "The Tarrey Town Race is On!", location: "Hudson Construction Site - Akkala" },
                { name: "The Treasure Hunters", location: "Rauru Hillside - Hyrule Field" },
                { name: "The Ultimate Dish?", location: "Rikoka Hills Well - Lanayru Wetlands" },
                { name: "To the Ruins!", location: "Gerudo Town (After completing Riju of Gerudo Town)" },
                { name: "Today's Menu", location: "Lookout Landing" },
                { name: "Treasure of the Gerudo Desert", location: "Gerudo Town (After completing Riju of Gerudo Town)" },
                { name: "Treasure of the Secret Springs", location: "Rito Village (After completing Tulin of Rito Village)" },
                { name: "True Treasure", location: "Zora's Domain" },
                { name: "Uma's Garden", location: "Hateno School - Hateno Village" },
                { name: "Unknown Huge Silhouette", location: "Lookout Landing" },
                { name: "Unknown Sky Giant", location: "Lookout Landing" },
                { name: "Unknown Three-Headed Monster", location: "Lookout Landing" },
                { name: "Village Attacked by Pirates", location: "Lookout Landing" },
                { name: "Walton's Treasure Hunt", location: "Korok Forest" },
                { name: "WANTED: Hinox", location: "Lookout Landing" },
                { name: "WANTED: Molduga", location: "Lookout Landing" },
                { name: "WANTED: Stone Talus", location: "Lookout Landing" },
                { name: "Where Are the Wells?", location: "Any Well (later found at Lookout Landing)" },
                { name: "Whirly Swirly Things", location: "Korok Forest" },
                { name: "Who Finds the Haven", location: "Snowfield Stable (Complete The Captured Tent Side Quest)" }
            ]
        },
        {
            category: "Shrine Quests",
            items: [
                { name: "The Satori Mountain Crystal", associatedShrine: "Usazum Shrine" },
                { name: "The White Bird's Guidance", associatedShrine: "Wao-os Shrine" },
                { name: "The Gisa Crater Crystal", associatedShrine: "Ikatak Shrine" },
                { name: "The North Hebra Mountains Crystal", associatedShrine: "Sisuran Shrine" },
                { name: "The Northwest Hebra Cave Crystal", associatedShrine: "Rutafu-um Shrine" },
                { name: "A Pretty Stone and Five Golden Apples", associatedShrine: "Pupunke Shrine" },
                { name: "None Shall Pass", associatedShrine: "Sakunbomar Shrine" },
                { name: "Maca's Special Place", associatedShrine: "Ninjis Shrine" },
                { name: "The Death Caldera Crystal", associatedShrine: "Momosik Shrine" },
                { name: "The Lake Intenoch Cave Crystal", associatedShrine: "Moshapin Shrine" },
                { name: "Rock for Sale", associatedShrine: "Jochi-ihiga Shrine" },
                { name: "Dyeing to Find It", associatedShrine: "Kurakat Shrine" },
                { name: "The High Spring and the Light Rings", associatedShrine: "Zakusu Shrine" },
                { name: "The Lanayru Road Crystal", associatedShrine: "O-ogim Shrine" },
                { name: "The Ralis Channel Crystal", associatedShrine: "Joniu Shrine" },
                { name: "Keys Born of Water", associatedShrine: "Jochisiu Shrine" },
                { name: "The Oakle's Navel Cave Crystal", associatedShrine: "Tokiy Shrine" },
                { name: "Ride the Giant Horse", associatedShrine: "Ishokin Shrine" },
                { name: "The Lake Hylia Crystal", associatedShrine: "En-oma Shrine" },
                { name: "Legend of the Soaring Spear", associatedShrine: "Utojis Shrine" },
                { name: "The Gerudo Canyon Crystal", associatedShrine: "Rakakudaj Shrine" },
                { name: "The North Hyrule Sky Crystal", associatedShrine: "Mayam Shrine" },
                { name: "The South Hyrule Sky Crystal", associatedShrine: "Jinodok Shrine" },
                { name: "The Tabantha Sky Crystal", associatedShrine: "Ganos Shrine" },
                { name: "The East Hebra Sky Crystal", associatedShrine: "Tauninoud Shrine" },
                { name: "The Sky Mine Crystal", associatedShrine: "Gikaku Shrine" },
                { name: "The Sokkala Sky Crystal", associatedShrine: "Natak Shrine" },
                { name: "The South Lanayru Sky Crystal", associatedShrine: "Mayanas Shrine" },
                { name: "The North Necluda Sky Crystal", associatedShrine: "Josiu Shrine" },
                { name: "The West Necluda Sky Crystal", associatedShrine: "Ukoojisi Shrine" },
                { name: "The Necluda Sky Crystal", associatedShrine: "Kumamayn Shrine" }
            ]
        }
    ];

    // Collection & Progression Data
    const dragonTearsData = [
        { name: "New Serenne Stable Dragon Tear", id: "new-serenne-stable-dragon-tear" },
        { name: "Tabantha Hills Dragon Tear", id: "tabantha-hills-dragon-tear" },
        { name: "Eldin Valley Dragon Tear", id: "eldin-valley-dragon-tear" },
        { name: "Batrea Lake Dragon Tear", id: "batrea-lake-dragon-tear" },
        { name: "Gerudo Mountains Dragon Tear", id: "gerudo-mountains-dragon-tear" },
        { name: "Illumeni Plateau Dragon Tear", id: "illumeni-plateau-dragon-tear" },
        { name: "Lurelin Dragon Tear", id: "lurelin-dragon-tear" },
        { name: "North Tabantha Snowfield Dragon Tear", id: "north-tabantha-snowfield-dragon-tear" },
        { name: "Talus Plateau Dragon Tear", id: "talus-plataeu-dragon-tear" },
        { name: "Lake Hylia Dragon Tear", id: "lake-hylia-dragon-tear" },
        { name: "Eldin Mountains Dragon Tear", id: "eldin-mountains-dragon-tear" },
        { name: "Rist Peninsula Dragon Tear", id: "rist-peninsula-dragon-tear" }
    ];

    const stoneTabletsData = [
        { name: "West of Rising Island Chain Stone Tablet", id: "west-rising-island-chain-stone-tablet" },
        { name: "East Hebra Sky Archipelago Stone Tablet", id: "east-hebra-sky-archipelago-stone-tablet" },
        { name: "North Hyrule Sky Archipelago Stone Tablet", id: "north-hyrule-sky-archipelago-stone-tablet" },
        { name: "North Gerudo Sky Archipelago Stone Tablet", id: "north-gerudo-sky-archipelago-stone-tablet" },
        { name: "West of Gerudo Sky Labyrinth Stone Tablet", id: "west-gerudo-sky-labyrinth-stone-tablet" },
        { name: "Above Great Plateau Stone Tablet", id: "above-great-plateau-stone-tablet" },
        { name: "Above Lake Deya Stone Tablet", id: "above-lake-deya-stone-tablet" },
        { name: "Above Mount Floria Stone Tablet", id: "above-mount-floria-stone-tablet" },
        { name: "Above Hateno Bay Stone Tablet", id: "above-hateno-bay-stone-tablet" },
        { name: "Lanayru Sky Archipelago Stone Tablet", id: "lanayru-sky-archipelago-stone-tablet" },
        { name: "South Eldin Sky Archipelago Stone Tablet", id: "south-eldin-sky-archipelago-stone-tablet" },
        { name: "Sokkala Sky Archipelago Stone Tablet", id: "sokkala-sky-archipelago-stone-tablet" }
    ];

    const sagesWillsData = [
        { name: "Hebra King Gleeok Sage's Will", id: "hebra-king-gleeok-sages-will" },
        { name: "South Hebra Sky Archipelago Sage's Will", id: "south-hebra-sky-archipelago-sages-will" },
        { name: "North Tabantha Sky Archipelago Sage's Will", id: "north-tabantha-sky-archipelago-sages-will" },
        { name: "North Gerudo Sky Archipelago Sage's Will", id: "north-gerudo-sky-archipelago-sages-will" },
        { name: "West Hyrule Sky Archipelago Sage's Will", id: "west-hyrule-sky-archipelago-sages-will" },
        { name: "Gerudo King Gleeok Sage's Will", id: "gerudo-king-gleeok-sages-will" },
        { name: "East Gerudo Sky Archipelago Sage's Will", id: "east-gerudo-sky-archipelago-sages-will" },
        { name: "South Hyrule Sky Archipelago Sage's Will", id: "south-hyrule-sky-archipelago-sages-will" },
        { name: "Faron Sky Archipelago Sage's Will", id: "faron-sky-archipelago-sages-will" },
        { name: "Thunderhead Isles Head Sage's Will", id: "thunderhead-isles-head-sages-will" },
        { name: "Thunderhead Isles Body Sage's Will", id: "thunderhead-isles-body-sages-will" },
        { name: "South Necluda Sky Archipelago Sage's Will", id: "south-necluda-sky-archipelago-sages-will" },
        { name: "Eventide Island King Gleeok Sage's Will", id: "eventide-island-king-gleeok-sages-will" },
        { name: "North Necluda Sky Archipelago Sage's Will", id: "north-necluda-sky-archipelago-sages-will" },
        { name: "Lanayru Sky Archipelago Sage's Will", id: "lanayru-sky-archipelago-sages-will" },
        { name: "Upland Zorana Sage's Will", id: "upland-zorana-sages-will" },
        { name: "Wellspring Island Sage's Will", id: "wellspring-island-sages-will" },
        { name: "Eldin Sky Archipelago Sage's Will", id: "eldin-sky-archipelago-sages-will" },
        { name: "Sokkala Sky Archipelago Sage's Will", id: "sokkala-sky-archipelago-sages-will" }
    ];

    const schematicsData = [
        { name: "12 Schema Stones", id: "schema-stones" },
        { name: "34 Yiga Schematics", id: "yiga-schematics" }
    ];

    const statsData = [
        { name: "Max Stamina / Hearts", id: "max-stamina-hearts" },
        { name: "Max Battery", id: "max-battery" }
    ];

    // Armors and Fabrics Data
    const armorsData = [
        { name: "3 Archaic Pieces", upgradeable: false },
        { name: "Hylian Set + Hood Down", upgradeable: true },
        { name: "Soldier's Set", upgradeable: true },
        { name: "Snowquil Set", upgradeable: true },
        { name: "Flamebreaker Set", upgradeable: true },
        { name: "Zora Set", upgradeable: true },
        { name: "Desert Voe Set", upgradeable: true },
        { name: "Rubber Set", upgradeable: true },
        { name: "Stealth Set", upgradeable: true },
        { name: "Climber's Set", upgradeable: true },
        { name: "Barbarian Set", upgradeable: true },
        { name: "Radiant Set", upgradeable: true },
        { name: "Royal Guard Set", upgradeable: true },
        { name: "Froggy Set", upgradeable: true },
        { name: "Glide Set", upgradeable: true },
        { name: "\"of the Depths\" Set", upgradeable: true },
        { name: "Miner's Set", upgradeable: true },
        { name: "Mystic Set", upgradeable: false },
        { name: "Ember Set", upgradeable: true },
        { name: "Charged Set", upgradeable: true },
        { name: "Frostbite Set", upgradeable: true },
        { name: "Yiga Set", upgradeable: true },
        { name: "Vah Medoh Divine Helm", upgradeable: true },
        { name: "Vah Rudania Divine Helm", upgradeable: true },
        { name: "Vah Ruta Divine Helm", upgradeable: true },
        { name: "Vah Naboris Divine Helm", upgradeable: true },
        { name: "Zonaite Set", upgradeable: true },
        { name: "Diamond Circlet", upgradeable: true },
        { name: "Ruby Circlet", upgradeable: true },
        { name: "Sapphire Circlet", upgradeable: true },
        { name: "Topaz Earrings", upgradeable: true },
        { name: "Opal Earrings", upgradeable: true },
        { name: "Amber Earrings", upgradeable: true },
        { name: "Well-Worn Hair Band", upgradeable: false },
        { name: "Cece's Hat", upgradeable: false },
        { name: "Lightning Helm", upgradeable: false },
        { name: "Sand Boots", upgradeable: true },
        { name: "Snow Boots", upgradeable: true },
        { name: "Bokoblin Mask", upgradeable: false },
        { name: "Horriblin Mask", upgradeable: false },
        { name: "Moblin Mask", upgradeable: false },
        { name: "Lizalfos Mask", upgradeable: false },
        { name: "Lynel Mask", upgradeable: false },
        { name: "Tunic of Memories", upgradeable: true },
        { name: "Champion's Leathers", upgradeable: true },
        { name: "Island Lobster Shirt", upgradeable: false },
        { name: "Ravio's Hood", upgradeable: false },
        { name: "Zant's Helmet", upgradeable: false },
        { name: "Midna's Helmet", upgradeable: false },
        { name: "Majora's Mask", upgradeable: false },
        { name: "Korok Mask", upgradeable: false },
        { name: "Tingle's Set", upgradeable: false },
        { name: "Phantom Set", upgradeable: false },
        { name: "Evil Spirit Set", upgradeable: false },
        { name: "Sheik's Mask", upgradeable: true },
        { name: "Dark Set", upgradeable: false },
        { name: "Fierce Deity Set", upgradeable: true },
        { name: "\"of Awakening\" Set", upgradeable: true },
        { name: "\"of the Wild\" Set", upgradeable: true },
        { name: "\"of the Hero\" Set", upgradeable: true },
        { name: "\"of Time\" Set", upgradeable: true },
        { name: "\"of the Wind\" Set", upgradeable: true },
        { name: "\"of Twilight\" Set", upgradeable: true },
        { name: "\"of the Sky\" Set", upgradeable: true },
        { name: "Ancient Hero's Aspect", upgradeable: true }
    ];

    const regularFabricsData = [
        { name: "Addison's Fabric", obtainment: "Help Addison put up all the Hudson Signs" },
        { name: "Aerocuda Fabric", obtainment: "Take a photo of an Aercuda and show it to Sayge" },
        { name: "Cece Fabric", obtainment: "Speak to Sayge for the first time" },
        { name: "Chuchu Fabric", obtainment: "Take a photo of a Chuchu and show it to Sayge" },
        { name: "Cucco Fabric", obtainment: "Take a photo of a Cucco and show it to Sayge" },
        { name: "Eldin Ostrich Fabric", obtainment: "Take a photo of an Eldin Ostrich and show it to Sayge" },
        { name: "Gerudo Fabric", obtainment: "Complete the racecourse at the Southern Oasis Training Area in under 2:30 minutes" },
        { name: "Gleeok Fabric", obtainment: "Take a photo of a Gleeok and show it to Sayge" },
        { name: "Goron Fabric", obtainment: "Complete the 3 Mine-Cart Land Side Quests in the Eldin Southern Mine" },
        { name: "Grizzlemaw-Bear Fabric", obtainment: "Take a photo of a Grizzlemaw Bear and show it to Sayge" },
        { name: "Horse Fabric", obtainment: "Take a photo of a Horse and show it to Sayge" },
        { name: "Horse-God Fabric", obtainment: "Earn 5 Pony Points and cash it in at a stable" },
        { name: "Hudson Construction Fabric", obtainment: "Finish the \"Home on Arrange\" Side Quest" },
        { name: "Koltin Fabric", obtainment: "Collect every Bubbul Gem and give them to Koltin, then go to Satori Mountain" },
        { name: "Korok Fabric", obtainment: "Finish 'The Secret Room' Side Quest in the Korok Forest" },
        { name: "Lucky Clover Gazette Fabric", obtainment: "Complete 2 Lucky Clover Gazette Side Adventures" },
        { name: "Lurelin Village Fabric", obtainment: "Complete the Rattled Ralera Side Quest" },
        { name: "Lynel Fabric", obtainment: "Take a photo of a Lynel and show it to Sayge" },
        { name: "Monster-Control-Crew Fabric", obtainment: "Complete all \"Bring Peace to...\" Side Quests" },
        { name: "Nostalgic Fabric", obtainment: "In a Treasure Chest in the Temple of Time Ruins on the Great Plateau" },
        { name: "Ordinary Fabric", obtainment: "Standard Fabric the Paraglider comes with" },
        { name: "Robbie's Fabric", obtainment: "Complete the Hyrule Compendium and speak to Robbie" },
        { name: "Royal Hyrulean Fabric", obtainment: "In a chest in the Lockup of Hyrule Castle" },
        { name: "Sheikah Fabric", obtainment: "Buy anything from the Enchanted Store in Kakariko Village" },
        { name: "Stalnox Fabric", obtainment: "Take a picture of a Stalnox and show it to Sayge" },
        { name: "Yiga Fabric", obtainment: "Defeat at least 3 foes in the Blademaster's combat minigame" },
        { name: "Zonai Fabric", obtainment: "Complete the \"Legend of the Great Sky Island\" Side Quest" },
        { name: "Zonai Survey Team Fabric", obtainment: "Complete the \"Messages from an Ancient Era\" Side Adventure" },
        { name: "Zora Fabric", obtainment: "Complete \"The Blue Stone\" Side Quest at East Resevoir Lake" }
    ];

    const amiiboFabricsData = [
        { name: "Ancient-Sheikah Fabric", obtainment: "Guardian Amiibo" },
        { name: "Bokoblin Fabric", obtainment: "Bokoblin Amiibo" },
        { name: "Bygone-Royal Fabric", obtainment: "Wind Waker Toon Zelda Amiibo" },
        { name: "Champion's Leather Fabric", obtainment: "Tears of the Kingdom Link Amiibo" },
        { name: "Demon King Fabric", obtainment: "Ganondorf Amiibo" },
        { name: "Egg Fabric", obtainment: "Link's Awakening Link Amiibo" },
        { name: "Gerudo-Champion Fabric", obtainment: "Urbosa Amiibo" },
        { name: "Gerudo-King Fabric", obtainment: "Ganondorf (Tears of the Kingdom) Amiibo" },
        { name: "Goddess Fabric", obtainment: "Zelda and Loftwing Amiibo" },
        { name: "Goron-Champion Fabric", obtainment: "Daruk Amiibo" },
        { name: "Hylian-Hood Fabric", obtainment: "Rider Link Amiibo" },
        { name: "Hyrule-Princess Fabric", obtainment: "Breath of the Wild Zelda Amiibo" },
        { name: "King of Red Lions Fabric", obtainment: "Wind Waker Toon Link Amiibo or Smash Bros. series Toon Link Amiibo" },
        { name: "Lon Lon Ranch Fabric", obtainment: "Ocarina of Time Link Amiibo" },
        { name: "Majora's Mask Fabric", obtainment: "Scan a Majora's Mask Link Amiibo" },
        { name: "Mirror of Twilight Fabric", obtainment: "Wolf Link Amiibo" },
        { name: "Pixel Fabric", obtainment: "8-Bit Link Amiibo" },
        { name: "Princess of Twilight Fabric", obtainment: "Smash Bros. series Zelda Amiibo" },
        { name: "Princess Zelda Fabric", obtainment: "Princess Zelda (Tears of the Kingdom) Amiibo" },
        { name: "Rito-Champion Fabric", obtainment: "Revali Amiibo" },
        { name: "Sheik Fabric", obtainment: "Sheik Amiibo" },
        { name: "Sword-Spirit Fabric", obtainment: "Skyward Sword Link Amiibo" },
        { name: "Tunic of Memories Fabric", obtainment: "Archer Link Amiibo" },
        { name: "Zora-Champion Fabric", obtainment: "Mipha Amiibo" }
    ];

    // Completionist Medals & Unique Rewards Data
    const monsterMedalsData = [
        { name: "Hinox Medal", id: "hinox-medal" },
        { name: "Talus Medal", id: "talus-medal" },
        { name: "Molduga Medal", id: "molduga-medal" },
        { name: "Frox Medal", id: "frox-medal" },
        { name: "Gleeok Medal", id: "gleeok-medal" },
        { name: "Flux Construct Medal", id: "flux-construct-medal" }
    ];

    const horseGearData = [
        { name: "Traveler's Saddle and Bridle", id: "travelers-saddle-bridle" },
        { name: "Knight's Saddle and Bridle", id: "knights-saddle-bridle" },
        { name: "Extravagant Saddle and Bridle", id: "extravagant-saddle-bridle" },
        { name: "Monster Saddle and Bridle", id: "monster-saddle-bridle" },
        { name: "Royal Saddle and Bridle", id: "royal-saddle-bridle" },
        { name: "Towing Harness", id: "towing-harness" }
    ];

    // Extreme Goals Data (Revised Structure)
    const extremeGoalsMasterData = [
        {
            category: "999 Items", // New top-level category for extreme goals
            subcategories: [
                {
                    name: "Fruit",
                    items: [
                        "Golden Apple", "Spicy Pepper", "Fire Fruit", "Ice Fruit", "Shock Fruit",
                        "Splash Fruit", "Dazzlefruit", "Bomb Flower", "Muddle Bud", "Palm Fruit",
                        "Hylian Tomato", "Apple", "Wildberry", "Voltfruit", "Fleet-Lotus Seeds",
                        "Hydromelon", "Mighty Bananas"
                    ]
                },
                {
                    name: "Mushroom",
                    items: [
                        "Puffshroom", "Big Hearty Truffle", "Hearty Truffle", "Endura Shroom",
                        "Rushroom", "Brightcap", "Stamella Shroom", "Chillshroom", "Sunshroom",
                        "Hylian Shroom", "Zapshroom", "Silent Shroom", "Razorshroom", "Ironshroom",
                        "Skyshroom"
                    ]
                },
                {
                    name: "Wild Greens",
                    items: [
                        "Big Hearty Radish", "Hearty Radish", "Endura Carrot", "Hyrule Herb",
                        "Silent Princess", "Fortified Pumpkin", "Sun Pumpkin", "Swift Carrot",
                        "Stambulb", "Korok Frond", "Cool Safflina", "Warm Safflina", "Mighty Thistle",
                        "Armoranth", "Blue Nightshade", "Electric Safflina", "Swift Violet", "Sundelion"
                    ]
                },
                {
                    name: "Meat",
                    items: [
                        "Raw Gourmet Meat", "Raw Whole Bird", "Raw Prime Meat", "Raw Bird Thigh",
                        "Raw Meat", "Raw Bird Drumstick"
                    ]
                },
                {
                    name: "Seasoning",
                    items: [
                        "Courser Bee Honey", "Hylian Rice", "Bird Egg", "Tabantha Wheat",
                        "Hateno Cheese", "Fresh Milk", "Acorn", "Chickaloo Tree Nut",
                        "Cane Sugar", "Goron Spice", "Goat Butter", "Monster Extract",
                        "Oil Jar", "Dark Clump", "Rock Salt", "Star Fragment", "Fairy"
                    ]
                },
                {
                    name: "Seafood",
                    items: [
                        "Hearty Salmon", "Hearty Bass", "Hyrule Bass", "Staminoka Bass",
                        "Chillfin Trout", "Sizzlefin Trout", "Voltfin Trout", "Stealthfin Trout",
                        "Mighty Carp", "Armored Carp", "Sanke Carp", "Ancient Arowana",
                        "Glowing Cave Fish", "Mighty Porgy", "Armored Porgy", "Sneaky River Snail",
                        "Razorclaw Crab", "Ironshell Crab", "Bright-Eyed Crab"
                    ]
                },
                {
                    name: "Critters",
                    items: [
                        "Energetic Rhino Beetle", "Bladed Rhino Beetle", "Rugged Rhino Beetle",
                        "Sunset Firefly", "Deep Firefly", "Restless Cricket", "Tireless Frog",
                        "Hot-Footed Frog", "Sticky Frog", "Hearty Lizard", "Hightail Lizard",
                        "Fireproof Lizard", "Sticky Lizard", "Winterwing Butterfly", "Summerwing Butterfly",
                        "Thunderwing Butterfly", "Smotherwing Butterfly", "Cold Darner", "Warm Darner",
                        "Electric Darner"
                    ]
                },
                {
                    name: "Ores & Gems",
                    items: [
                        "Diamond", "Ruby", "Sapphire", "Topaz", "Opal", "Amber", "Luminous Stone", "Flint"
                    ]
                },
                {
                    name: "Monster Parts",
                    items: [
                        "Bokoblin Guts", "Moblin Guts", "Horriblin Guts", "Gibdo Guts",
                        "Boss Bokoblin Guts", "Lynel Guts", "Gleeok Guts", "Frox Guts",
                        "Molduga Guts", "Hinox Guts", "Red Chuchu Jelly", "White Chuchu Jelly",
                        "Yelllow Chuchu Jelly", "Chuchu Jelly", "Octo Balloon", "Keese Eyeball",
                        "Fire Keese Eyeball", "Ice Keese Eyeball", "Electric Keese Eyeball",
                        "Octorok Eyeball", "Aerocuda Eyeball", "Keese Wing", "Fire Keese Wing",
                        "Ice Keese Wing", "Electric Keese Wing", "Aerocuda Wing", "Gibdo Wing",
                        "Gleeok Wing", "Molduga Fin", "Bokoblin Horn", "Blue Bokoblin Horn",
                        "Black Bokoblin Horn", "Silber Bokoblin Horn", "Boss Bokoblin Horn",
                        "Blue Boss Bokoblin Horn", "Black Boss Bokoblin Horn", "Silver Boss Bokoblin Horn",
                        "Lizalfos Horn", "Blue Lizalfos Horn", "Black Lizalfos Horn", "Silver Lizalfos Horn",
                        "Fire-Breath Lizalfos Horn", "Ice-Breath Lizalfos Horn", "Electric Lizalfos Horn",
                        "Lynel Saber Horn", "Blue-Maned Lynel Saber Horn", "White-Maned Lynel Saber Horn",
                        "Silver Lynel Saber Horn", "Soldier Construct Horn", "Soldier Construct II Horn",
                        "Soldier Construct III Horn", "Soldier Construct IV Horn", "Captain Construct I Horn",
                        "Captain Construct II Horn",
                        "Captain Construct III Horn", "Captain Construct IV Horn",
                        "Hinox Toenail", "Gleeok Flame Horn", "Gleeok Frost Horn", "Gleeok Thunder Horn",
                        "Dinraal's Horn", "Naydra's Horn", "Farosh's Horn", "Light Dragon's Horn",
                        "Like Like Stone", "Fire Like Stone", "Ice Like Stone", "Shock Like Stone",
                        "Moblin Horn", "Blue Moblin Horn", "Black Moblin Horn", "Silver Moblin Horn",
                        "Horriblin Horn", "Blue Horriblin Horn", "Black Horriblin Horn", "Silver Horriblin Horn",
                        "Lynel Hoof", "Lynel Mace Horn", "Blue-Maned Lynel Mace Horn", "White-Maned Lynel Mace Horn",
                        "Silver Lynel Mace Horn", "Hinox Horn", "Blue Hinox Horn", "Black Hinox Horn",
                        "Stalnox Horn", "Molduga Jaw", "Frox Fang", "Obsidian Frox Fang",
                        "Blue-White Frox Fang", "Shard of Dinraal's Spike", "Shard of Naydra's Spike",
                        "Shard of Farosh's Spike", "Shard of Light Dragon's Spike", "Lizalfos Tail",
                        "Blue Lizalfos Tail", "Black Lizalfos Tail", "Silver Lizalfos Tail",
                        "Fire-Breath Lizalfos Tail", "Ice-Breath Lizalfos Tail", "Electric Lizalfos Tail",
                        "Gibdo Bone", "Octorok Tentacle", "Bokoblin Fang", "Moblin Fang",
                        "Boss Bokoblin Fang", "Hinox Tooth", "Horriblin Claw", "Lizalfos Talon",
                        "Frox Fingernail", "Dinraal's Scale", "Naydra's Scale", "Farosh's Scale",
                        "Light Dragon's Scale", "Dinraal's Claw", "Naydra's Claw", "Farosh's Claw",
                        "Light Dragon's Claw", "Shard of Dinraal's Fang", "Shard of Naydra's Fang",
                        "Shard of Farosh's Fang", "Shard of Light Dragon's Fang"
                    ]
                },
                {
                    name: "Miscellaneous",
                    items: [
                        "Ancient Blade", "King's Scale", "Brightbloom Seed", "Giant Brightbloom Seed",
                        "Hylian Pine Cone", "Wood"
                    ]
                },
                {
                    name: "Zonai Material",
                    items: [
                        "Zonaite", "Large Zonaite", "Zonai Charge", "Large Zonai Charge"
                    ]
                },
                {
                    name: "Zonai Devices",
                    items: [
                        "Fan", "Wing", "Cart", "Balloon", "Rocket", "Time Bomb", "Portable Pot",
                        "Flame Emitter", "Frost Emitter", "Shock Emitter", "Beam Emitter",
                        "Hydrant", "Steering Stick", "Big Wheel", "Small Wheel", "Sled",
                        "Battery", "Big Battery", "Spring", "Cannon", "Stabilizer", "Hover Stone",
                        "Light", "Stake", "Mirror", "Homing Cart", "Construct Head"
                    ]
                }
            ]
        }
    ];


    const shrineLightrootContent = document.getElementById('shrine-lightroot-content');
    const shrineLightrootCountSpan = document.getElementById('shrine-lightroot-count');

    const koroksContent = document.getElementById('koroks-content');
    const koroksCountSpan = document.getElementById('koroks-count');

    const explorationLocationsContent = document.getElementById('exploration-locations-content');
    const explorationLocationsCountSpan = document.getElementById('exploration-locations-count');

    const questsContent = document.getElementById('quests-content');
    const questsOverallCountSpan = document.getElementById('quests-overall-count');

    const collectionProgressionContent = document.getElementById('collection-progression-content');
    const collectionProgressionCountSpan = document.getElementById('collection-progression-count');

    const armorsFabricsContent = document.getElementById('armors-fabrics-content');
    const armorsFabricsCountSpan = document.getElementById('armors-fabrics-count');

    const completionistMedalsContent = document.getElementById('completionist-medals-content');
    const completionistMedalsCountSpan = document.getElementById('completionist-medals-count');

    // NEW: Get the elements for Extreme Goals section
    const extremeGoalsContent = document.getElementById('extreme-goals-content');
    const extremeGoalsCountSpan = document.getElementById('extreme-goals-count');


    // Function to calculate and update all completion counts (UPDATED)
    function updateCounts() {
        // --- Shrines & Lightroots ---
        let currentCompletedShrinesOverall = 0;
        let currentCompletedLightrootsOverall = 0;
        let totalShrinesOverall = 0;
        let totalLightrootsOverall = 0;

        shrineLightrootData.forEach(group => {
            let groupShrinesCompleted = 0;
            let groupLightrootsCompleted = 0;
            const totalGroupShrines = group.shrines.length;
            const totalGroupLightroots = group.location !== "Sky-Island Shrines" ? group.shrines.length : 0;

            totalShrinesOverall += totalGroupShrines;
            totalLightrootsOverall += totalGroupLightroots;

            group.shrines.forEach(shrineName => {
                const baseId = `${group.location.replace(/\s+/g, '')}-${shrineName.replace(/\s+/g, '').replace(/'/g, '')}`;
                const shrineUniqueId = `${baseId}-shrine`;
                if (localStorage.getItem(shrineUniqueId) === 'true') {
                    groupShrinesCompleted++;
                }

                if (group.location !== "Sky-Island Shrines") {
                    const lightrootUniqueId = `${baseId}-lightroot`;
                    if (localStorage.getItem(lightrootUniqueId) === 'true') {
                        groupLightrootsCompleted++;
                    }
                }
            });

            const locationHeaderElements = document.querySelectorAll('.location-group-header');
            let foundLocationHeader = null;
            locationHeaderElements.forEach(header => {
                const headerText = Array.from(header.childNodes)
                                         .filter(node => node.nodeType === Node.TEXT_NODE)
                                         .map(node => node.textContent.trim())
                                         .join('');
                if (headerText === group.location) {
                    foundLocationHeader = header;
                }
            });

            if (foundLocationHeader) {
                const locationCountSpan = foundLocationHeader.querySelector('.location-completion-count');
                if (locationCountSpan) {
                    locationCountSpan.textContent = `(${groupShrinesCompleted}/${totalGroupShrines} Shrines, ${groupLightrootsCompleted}/${totalGroupLightroots} Lightroots)`;
                }
            }
        });

        document.querySelectorAll('input[id$="-shrine"]').forEach(checkbox => {
            if (localStorage.getItem(checkbox.id) === 'true') {
                currentCompletedShrinesOverall++;
            }
        });

        document.querySelectorAll('input[id$="-lightroot"]').forEach(checkbox => {
            if (localStorage.getItem(checkbox.id) === 'true') {
                currentCompletedLightrootsOverall++;
            }
        });
        shrineLightrootCountSpan.textContent = `${currentCompletedShrinesOverall}/${totalShrinesOverall} Shrines, ${currentCompletedLightrootsOverall}/${totalLightrootsOverall} Lightroots`;


        // --- Koroks Count Update ---
        let currentCompletedKoroks = 0;
        let totalKoroksFromData = 0;

        korokRegionsData.forEach(regionGroup => {
            let regionKoroksCompleted = 0;
            let totalRegionKoroks = 0;

            regionGroup.subregions.forEach(sub => {
                const subregionId = `${regionGroup.region.replace(/\s+/g, '')}-${sub.name.replace(/\s+/g, '').replace(/'/g, '')}-korok`;
                totalRegionKoroks += sub.count;
                if (localStorage.getItem(subregionId) === 'true') {
                    currentCompletedKoroks += sub.count;
                    regionKoroksCompleted += sub.count;
                }
            });
            totalKoroksFromData += totalRegionKoroks;

            const regionHeaderElement = document.getElementById(`${regionGroup.region.replace(/\s+/g, '')}-korok-region-header`);
            if (regionHeaderElement) {
                const regionCountSpan = regionHeaderElement.querySelector('.region-completion-count');
                if (regionCountSpan) {
                    regionCountSpan.textContent = `(${regionKoroksCompleted}/${totalRegionKoroks} Seeds)`;
                }
            }
        });

        const displayedKorokCount = Math.min(currentCompletedKoroks, 1000);
        koroksCountSpan.textContent = `${displayedKorokCount}/1000 Koroks`;

        // --- Exploration & Locations Count Update ---
        let completedLocationsCount = 0;
        let totalLocationsCount = 0;
        let completedBubbulfrogsCount = 0;
        let totalBubbulfrogsCount = 0;
        let completedCompendiumItems = 0; // New counter for compendium
        let totalCompendiumItems = 0; // New total for compendium

        explorationLocationsData.forEach(categoryGroup => {
            const categoryHeaderId = `${categoryGroup.category.replace(/\s+/g, '')}-exploration-category-header`;
            const categoryHeaderElement = document.getElementById(categoryHeaderId);
            let currentCategoryCount = 0;
            let totalCategoryCount = 0;

            if (categoryGroup.subcategories) {
                categoryGroup.subcategories.forEach(subCategory => {
                    subCategory.items.forEach(item => {
                        // Determine the item name based on whether it's a string or an object
                        const itemName = typeof item === 'object' && item !== null && item.name ? item.name : item;

                        totalCategoryCount++;
                        const itemId = `${categoryGroup.category.replace(/\s+/g, '')}-${subCategory.name.replace(/\s+/g, '')}-${itemName.replace(/\s+/g, '')}`.replace(/[^\w-]/g, '');
                        if (localStorage.getItem(itemId) === 'true') {
                            completedLocationsCount++;
                            currentCategoryCount++;
                        }
                        // If it's a compendium item, add to compendium specific counts
                        if (categoryGroup.category === "Hyrule Compendium") {
                            totalCompendiumItems++;
                            if (localStorage.getItem(itemId) === 'true') {
                                completedCompendiumItems++;
                            }
                        }
                    });
                });
            } else {
                categoryGroup.items.forEach(item => {
                    totalCategoryCount++;
                    const itemId = `${categoryGroup.category.replace(/\s+/g, '')}-${item.name.replace(/\s+/g, '')}`.replace(/[^\w-]/g, '');
                    if (localStorage.getItem(itemId) === 'true') {
                        completedLocationsCount++;
                        currentCategoryCount++;
                    }
                    if (categoryGroup.category === "Caves") {
                        totalBubbulfrogsCount++;
                        const bubbulfrogId = `${itemId}-bubbulfrog`;
                        if (localStorage.getItem(bubbulfrogId) === 'true') {
                            completedBubbulfrogsCount++;
                        }
                    }
                });
            }

            if (categoryGroup.category === "Caves") {
                const caveEntrancesId = `all-191-cave-entrances`;
                if (localStorage.getItem(caveEntrancesId) === 'true') {
                    completedLocationsCount++;
                }
                totalCategoryCount++;
            }


            if (categoryHeaderElement) {
                const categoryCountSpan = categoryHeaderElement.querySelector('.region-completion-count');
                if (categoryCountSpan) {
                    if (categoryGroup.category === "Caves") {
                        categoryCountSpan.textContent = `(${currentCategoryCount}/${totalCategoryCount - 1} Caves, ${completedBubbulfrogsCount}/${totalBubbulfrogsCount} Bubbul Gems)`;
                    } else if (categoryGroup.category === "Towns, Settlements, and Stables") {
                           const totalTownsSettlements = categoryGroup.subcategories[0].items.length;
                        const totalStables = categoryGroup.subcategories[1].items.length;
                        const currentTownsSettlements = Array.from(document.querySelectorAll(`input[id^="${categoryGroup.category.replace(/\s+/g, '')}-${categoryGroup.subcategories[0].name.replace(/\s+/g, '')}"]`)).filter(cb => cb.checked).length;
                        const currentStables = Array.from(document.querySelectorAll(`input[id^="${categoryGroup.category.replace(/\s+/g, '')}-${categoryGroup.subcategories[1].name.replace(/\s+/g, '')}"]`)).filter(cb => cb.checked).length;
                        categoryCountSpan.textContent = `(${currentTownsSettlements}/${totalTownsSettlements} Towns/Settlements, ${currentStables}/${totalStables} Stables)`;
                    } else if (categoryGroup.category === "Hyrule Compendium") {
                        categoryCountSpan.textContent = `(${completedCompendiumItems}/${totalCompendiumItems} Entries)`;
                    }
                    else {
                        categoryCountSpan.textContent = `(${currentCategoryCount}/${totalCategoryCount} Items)`;
                    }
                }
            }
        });

        let totalExpectedExplorationItems = 0;
        explorationLocationsData.forEach(categoryGroup => {
            if (categoryGroup.subcategories) {
                categoryGroup.subcategories.forEach(subCategory => {
                    totalExpectedExplorationItems += subCategory.items.length;
                });
            } else {
                totalExpectedExplorationItems += categoryGroup.items.length;
            }
        });
        totalExpectedExplorationItems += 1; // For the "All 191 Cave Entrances" checkbox

        explorationLocationsCountSpan.textContent = `${completedLocationsCount}/${totalExpectedExplorationItems} Locations`;


        // --- Quests Count Update ---
        let completedMainQuests = 0;
        let totalMainQuests = 0;
        let completedSideAdventures = 0;
        let totalSideAdventures = 0;
        let completedSideQuests = 0;
        let totalSideQuests = 0;
        let completedShrineQuests = 0;
        let totalShrineQuests = 0;

        questsData.forEach(categoryGroup => {
            let completedInCategory = 0;
            let totalInCategory = categoryGroup.items.length;

            categoryGroup.items.forEach(item => {
                const itemId = `${categoryGroup.category.replace(/\s+/g, '')}-${item.name.replace(/\s+/g, '').replace(/[^\w-]/g, '')}`;
                if (localStorage.getItem(itemId) === 'true') {
                    completedInCategory++;
                    if (categoryGroup.category === "Main Quests") completedMainQuests++;
                    else if (categoryGroup.category === "Side Adventures") completedSideAdventures++;
                    else if (categoryGroup.category === "Side Quests") completedSideQuests++;
                    else if (categoryGroup.category === "Shrine Quests") completedShrineQuests++;
                }
            });
            if (categoryGroup.category === "Main Quests") totalMainQuests = totalInCategory;
            else if (categoryGroup.category === "Side Adventures") totalSideAdventures = totalInCategory;
            else if (categoryGroup.category === "Side Quests") totalSideQuests = totalInCategory;
            else if (categoryGroup.category === "Shrine Quests") totalShrineQuests = totalInCategory;


            const categoryHeaderId = `${categoryGroup.category.replace(/\s+/g, '').replace(/[^\w-]/g, '')}-quest-category-header`;
            const categoryHeader = document.getElementById(categoryHeaderId);
            if (categoryHeader) {
                const countSpan = categoryHeader.querySelector('.region-completion-count');
                if (countSpan) {
                    countSpan.textContent = `(${completedInCategory}/${totalInCategory} Quests)`;
                }
            }
        });

        const overallQuestsCompleted = completedMainQuests + completedSideAdventures + completedSideQuests + completedShrineQuests;
        const overallQuestsTotal = totalMainQuests + totalSideAdventures + totalSideQuests + totalShrineQuests;
        questsOverallCountSpan.textContent = `${overallQuestsCompleted}/${overallQuestsTotal} Complete`;

        // --- Collection & Progression Count Update ---
        let completedCollectionItems = 0;
        let totalCollectionItems = 0;

        let completedDragonTears = 0;
        dragonTearsData.forEach(tear => {
            totalCollectionItems++;
            if (localStorage.getItem(tear.id) === 'true') {
                completedDragonTears++;
                completedCollectionItems++;
            }
        });
        const dragonTearsHeader = document.getElementById('DragonTears-collection-category-header');
        if (dragonTearsHeader) {
            const countSpan = dragonTearsHeader.querySelector('.region-completion-count');
            if (countSpan) {
                countSpan.textContent = `(${completedDragonTears}/${dragonTearsData.length} Tears)`;
            }
        }

        let completedStoneTablets = 0;
        stoneTabletsData.forEach(tablet => {
            totalCollectionItems++;
            if (localStorage.getItem(tablet.id) === 'true') {
                completedStoneTablets++;
                completedCollectionItems++;
            }
        });
        const stoneTabletsHeader = document.getElementById('StoneTablets-collection-category-header');
        if (stoneTabletsHeader) {
            const countSpan = stoneTabletsHeader.querySelector('.region-completion-count');
            if (countSpan) {
                countSpan.textContent = `(${completedStoneTablets}/${stoneTabletsData.length} Tablets)`;
            }
        }

        let completedSagesWills = 0;
        sagesWillsData.forEach(will => {
            totalCollectionItems++;
            if (localStorage.getItem(will.id) === 'true') {
                completedSagesWills++;
                completedCollectionItems++;
            }
        });
        const sagesWillsHeader = document.getElementById('SagesWills-collection-category-header');
        if (sagesWillsHeader) {
            const countSpan = sagesWillsHeader.querySelector('.region-completion-count');
            if (countSpan) {
                countSpan.textContent = `(${completedSagesWills}/${sagesWillsData.length} Wills)`;
            }
        }

        totalCollectionItems++;
        const solemnVowsId = 'all-5-solemn-vows';
        if (localStorage.getItem(solemnVowsId) === 'true') {
            completedCollectionItems++;
        }

        let completedSchematics = 0;
        schematicsData.forEach(schematic => {
            totalCollectionItems++;
            if (localStorage.getItem(schematic.id) === 'true') {
                completedSchematics++;
                completedCollectionItems++;
            }
        });
        const schematicsHeader = document.getElementById('Schematics-collection-category-header');
        if (schematicsHeader) {
            const countSpan = schematicsHeader.querySelector('.region-completion-count');
            if (countSpan) {
                countSpan.textContent = `(${completedSchematics}/${schematicsData.length} Items)`;
            }
        }

        let completedStats = 0;
        statsData.forEach(stat => {
            totalCollectionItems++;
            if (localStorage.getItem(stat.id) === 'true') {
                completedStats++;
                completedCollectionItems++;
            }
        });
        const statsHeader = document.getElementById('Stats-collection-category-header');
        if (statsHeader) {
            const countSpan = statsHeader.querySelector('.region-completion-count');
            if (countSpan) {
                countSpan.textContent = `(${completedStats}/${statsData.length} Items)`;
            }
        }

        collectionProgressionCountSpan.textContent = `${completedCollectionItems}/${totalCollectionItems} Complete`;

        // --- Armors & Fabrics Count Update ---
        let completedArmors = 0;
        let totalArmors = 0;
        let completedUpgrades = 0;
        let totalUpgrades = 0;

        armorsData.forEach(armor => {
            totalArmors++;
            const armorId = `armor-${armor.name.replace(/\s+/g, '').replace(/[^\w-]/g, '')}`;
            if (localStorage.getItem(armorId) === 'true') {
                completedArmors++;
            }
            if (armor.upgradeable) {
                totalUpgrades++;
                const upgradeId = `${armorId}-4-stars`;
                if (localStorage.getItem(upgradeId) === 'true') {
                    completedUpgrades++;
                }
            }
        });

        const armorsHeader = document.getElementById('Armors-armor-category-group-header');
        if (armorsHeader) {
            const countSpan = armorsHeader.querySelector('.region-completion-count');
            if (countSpan) {
                countSpan.textContent = `(${completedArmors}/${totalArmors} Armors, ${completedUpgrades}/${totalUpgrades} Upgrades)`;
            }
        }

        let completedRegularFabrics = 0;
        let totalRegularFabrics = regularFabricsData.length;
        regularFabricsData.forEach(fabric => {
            const fabricId = `fabric-${fabric.name.replace(/\s+/g, '').replace(/[^\w-]/g, '')}`;
            if (localStorage.getItem(fabricId) === 'true') {
                completedRegularFabrics++;
            }
        });

        let completedAmiiboFabrics = 0;
        let totalAmiiboFabrics = amiiboFabricsData.length;
        amiiboFabricsData.forEach(fabric => {
            const fabricId = `fabric-${fabric.name.replace(/\s+/g, '').replace(/[^\w-]/g, '')}`;
            if (localStorage.getItem(fabricId) === 'true') {
                completedAmiiboFabrics++;
            }
        });

        const regularFabricsHeader = document.getElementById('RegularFabrics-fabric-subcategory-header');
        if (regularFabricsHeader) {
            const countSpan = regularFabricsHeader.querySelector('.region-completion-count');
            if (countSpan) {
                countSpan.textContent = `(${completedRegularFabrics}/${totalRegularFabrics} Regular)`;
            }
        }

        const amiiboFabricsHeader = document.getElementById('AmiiboExclusive-fabric-subcategory-header');
        if (amiiboFabricsHeader) {
            const countSpan = amiiboFabricsHeader.querySelector('.region-completion-count');
            if (countSpan) {
                countSpan.textContent = `(${completedAmiiboFabrics}/${totalAmiiboFabrics} Amiibo)`;
            }
        }

        const totalFabrics = totalRegularFabrics + totalAmiiboFabrics;
        const completedFabrics = completedRegularFabrics + completedAmiiboFabrics;

        const fabricsHeader = document.getElementById('Fabrics-fabric-category-group-header');
        if (fabricsHeader) {
            const countSpan = fabricsHeader.querySelector('.region-completion-count');
            if (countSpan) {
                countSpan.textContent = `(${completedFabrics}/${totalFabrics} Fabrics)`;
            }
        }

        const totalArmorsFabricsItems = totalArmors + totalUpgrades + totalFabrics;
        const completedArmorsFabricsItems = completedArmors + completedUpgrades + completedFabrics;
        armorsFabricsCountSpan.textContent = `${completedArmorsFabricsItems}/${totalArmorsFabricsItems} Complete`;

        // --- Completionist Medals & Unique Rewards Count Update ---
        let completedMonsterMedals = 0;
        let totalMonsterMedals = monsterMedalsData.length;
        monsterMedalsData.forEach(medal => {
            if (localStorage.getItem(medal.id) === 'true') {
                completedMonsterMedals++;
            }
        });
        const monsterMedalsHeader = document.getElementById('MonsterMedals-medals-category-group-header');
        if (monsterMedalsHeader) {
            const countSpan = monsterMedalsHeader.querySelector('.region-completion-count');
            if (countSpan) {
                countSpan.textContent = `(${completedMonsterMedals}/${totalMonsterMedals} Medals)`;
            }
        }

        let completedHorseGear = 0;
        let totalHorseGear = horseGearData.length;
        horseGearData.forEach(gear => {
            if (localStorage.getItem(gear.id) === 'true') {
                completedHorseGear++;
            }
        });
        const horseGearHeader = document.getElementById('HorseSaddlesAndBridles-horse-gear-category-group-header');
        if (horseGearHeader) {
            const countSpan = horseGearHeader.querySelector('.region-completion-count');
            if (countSpan) {
                countSpan.textContent = `(${completedHorseGear}/${totalHorseGear} Items)`;
            }
        }

        const totalCompletionistMedalsItems = totalMonsterMedals + totalHorseGear;
        const completedCompletionistMedalsItems = completedMonsterMedals + completedHorseGear;
        completionistMedalsCountSpan.textContent = `${completedCompletionistMedalsItems}/${totalCompletionistMedalsItems} Complete`;

        // --- NEW: Extreme Goals Count Update ---
        let completedExtremeGoals = 0;
        let totalExtremeGoals = 0;

        extremeGoalsMasterData.forEach(masterCategory => {
            if (masterCategory.subcategories) {
                // Calculate for the "999 Items" subcategory
                let completed999Items = 0;
                let total999Items = 0;

                masterCategory.subcategories.forEach(categoryGroup => {
                    let completedInCategory = 0;
                    let totalInCategory = categoryGroup.items.length;

                    categoryGroup.items.forEach(item => {
                        totalExtremeGoals++; // Overall count for Extreme Goals
                        total999Items++; // Count for "999 Items" subcategory
                        const itemId = `extreme-999-${categoryGroup.name.replace(/\s+/g, '').replace(/[^\w-]/g, '')}-${item.replace(/\s+/g, '').replace(/[^\w-]/g, '')}`;
                        if (localStorage.getItem(itemId) === 'true') {
                            completedExtremeGoals++;
                            completedInCategory++;
                            completed999Items++;
                        }
                    });

                    const categoryHeaderId = `ExtremeGoals-${categoryGroup.name.replace(/\s+/g, '').replace(/[^\w-]/g, '')}-subcategory-header`;
                    const categoryHeader = document.getElementById(categoryHeaderId);
                    if (categoryHeader) {
                        const countSpan = categoryHeader.querySelector('.region-completion-count');
                        if (countSpan) {
                            countSpan.textContent = `(${completedInCategory}/${totalInCategory} Items)`;
                        }
                    }
                });

                // Update the "999 Items" header count
                const masterCategoryHeader = document.getElementById(`ExtremeGoals-${masterCategory.category.replace(/\s+/g, '').replace(/[^\w-]/g, '')}-header`);
                if (masterCategoryHeader) {
                    const countSpan = masterCategoryHeader.querySelector('.region-completion-count');
                    if (countSpan) {
                        countSpan.textContent = `(${completed999Items}/${total999Items} Items)`;
                    }
                }
            }
        });
        extremeGoalsCountSpan.textContent = `${completedExtremeGoals}/${totalExtremeGoals} Complete`;
    }


    // Function to render shrines and lightroots
    function renderShrineLightroots() {
        shrineLightrootContent.innerHTML = '';

        shrineLightrootData.forEach(group => {
            const locationGroupDiv = document.createElement('div');
            locationGroupDiv.classList.add('location-group');

            const locationHeader = document.createElement('h3');
            locationHeader.classList.add('location-group-header');

            const locationNameTextNode = document.createTextNode(group.location);
            locationHeader.appendChild(locationNameTextNode);

            const locationCountSpan = document.createElement('span');
            locationCountSpan.classList.add('location-completion-count');
            locationHeader.appendChild(locationCountSpan);

            locationGroupDiv.appendChild(locationHeader);

            const locationGroupContent = document.createElement('div');
            locationGroupContent.classList.add('location-group-content');
            locationGroupDiv.appendChild(locationGroupContent);

            // Skyview Tower Checkbox
            if (skyviewTowerData[group.location]) {
                const towerCheckboxContainer = document.createElement('div');
                towerCheckboxContainer.classList.add('skyview-tower-label-container');

                const towerCheckbox = document.createElement('input');
                towerCheckbox.type = 'checkbox';
                const towerId = `${group.location.replace(/\s+/g, '')}-skyview-tower`;
                towerCheckbox.id = towerId;
                towerCheckbox.checked = localStorage.getItem(towerId) === 'true';

                const towerLabel = document.createElement('span');
                towerLabel.classList.add('skyview-tower-label');
                towerLabel.textContent = 'Skyview Tower Unlocked';

                towerCheckboxContainer.appendChild(towerCheckbox);
                towerCheckboxContainer.appendChild(towerLabel);

                if (towerCheckbox.checked) {
                    towerCheckboxContainer.classList.add('completed-tower');
                }

                locationGroupContent.appendChild(towerCheckboxContainer);

                towerCheckbox.addEventListener('change', () => {
                    if (towerCheckbox.checked) {
                        localStorage.setItem(towerId, 'true');
                        towerCheckboxContainer.classList.add('completed-tower');
                    } else {
                        localStorage.removeItem(towerId);
                        towerCheckboxContainer.classList.remove('completed-tower');
                    }
                    updateCounts();
                });
            }

            const itemList = document.createElement('div');
            itemList.classList.add('item-list');
            locationGroupContent.appendChild(itemList);

            group.shrines.forEach((shrineName) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');

                const baseId = `${group.location.replace(/\s+/g, '')}-${shrineName.replace(/\s+/g, '').replace(/'/g, '')}`;

                // Shrine Checkbox and Name
                const shrineRowDiv = document.createElement('div');
                shrineRowDiv.classList.add('shrine-row');

                const shrineCheckbox = document.createElement('input');
                shrineCheckbox.type = 'checkbox';
                shrineCheckbox.id = `${baseId}-shrine`;
                shrineCheckbox.checked = localStorage.getItem(shrineCheckbox.id) === 'true';

                const shrineNameSpan = document.createElement('span');
                shrineNameSpan.classList.add('shrine-name');
                shrineNameSpan.textContent = shrineName;

                shrineRowDiv.appendChild(shrineCheckbox);
                shrineRowDiv.appendChild(shrineNameSpan);
                itemDiv.appendChild(shrineRowDiv);

                if (shrineCheckbox.checked) {
                    itemDiv.classList.add('completed-shrine');
                }

                shrineCheckbox.addEventListener('change', () => {
                    if (shrineCheckbox.checked) {
                        itemDiv.classList.add('completed-shrine');
                        localStorage.setItem(shrineCheckbox.id, 'true');
                    } else {
                        itemDiv.classList.remove('completed-shrine');
                        localStorage.removeItem(shrineCheckbox.id);
                    }
                    updateCounts();
                });

                // Lightroot Checkbox and Name (if applicable)
                if (group.location !== "Sky-Island Shrines") {
                    const lightrootRowDiv = document.createElement('div');
                    lightrootRowDiv.classList.add('lightroot-row');

                    const lightrootCheckbox = document.createElement('input');
                    lightrootCheckbox.type = 'checkbox';
                    lightrootCheckbox.id = `${baseId}-lightroot`;
                    lightrootCheckbox.checked = localStorage.getItem(lightrootCheckbox.id) === 'true';

                    const lightrootNameSpan = document.createElement('span');
                    lightrootNameSpan.classList.add('lightroot-name');
                    lightrootNameSpan.textContent = reverseName(shrineName);

                    lightrootRowDiv.appendChild(lightrootCheckbox);
                    lightrootRowDiv.appendChild(lightrootNameSpan);
                    itemDiv.appendChild(lightrootRowDiv);

                    if (lightrootCheckbox.checked) {
                        itemDiv.classList.add('completed-lightroot');
                    }

                    lightrootCheckbox.addEventListener('change', () => {
                        if (lightrootCheckbox.checked) {
                            itemDiv.classList.add('completed-lightroot');
                            localStorage.setItem(lightrootCheckbox.id, 'true');
                        } else {
                            itemDiv.classList.remove('completed-lightroot');
                            localStorage.removeItem(lightrootCheckbox.id);
                        }
                        updateCounts();
                    });
                }

                // Shrine Treasure Checkbox
                const shrineTreasureRowDiv = document.createElement('div');
                shrineTreasureRowDiv.classList.add('shrine-treasure-row');

                const shrineTreasureCheckbox = document.createElement('input');
                shrineTreasureCheckbox.type = 'checkbox';
                shrineTreasureCheckbox.id = `${baseId}-shrine-treasure`;
                shrineTreasureCheckbox.checked = localStorage.getItem(shrineTreasureCheckbox.id) === 'true';

                const shrineTreasureLabel = document.createElement('span');
                shrineTreasureLabel.classList.add('shrine-treasure-label');
                shrineTreasureLabel.textContent = 'Treasure Collected';

                shrineTreasureRowDiv.appendChild(shrineTreasureCheckbox);
                shrineTreasureRowDiv.appendChild(shrineTreasureLabel);
                itemDiv.appendChild(shrineTreasureRowDiv);

                if (shrineTreasureCheckbox.checked) {
                    itemDiv.classList.add('completed-treasure');
                }

                shrineTreasureCheckbox.addEventListener('change', () => {
                    if (shrineTreasureCheckbox.checked) {
                        localStorage.setItem(shrineTreasureCheckbox.id, 'true');
                        itemDiv.classList.add('completed-treasure');
                    } else {
                        localStorage.removeItem(shrineTreasureCheckbox.id);
                        itemDiv.classList.remove('completed-treasure');
                    }
                    updateCounts();
                });

                itemList.appendChild(itemDiv);
            });
            shrineLightrootContent.appendChild(locationGroupDiv);

            locationHeader.addEventListener('click', () => {
                toggleContent(locationGroupContent);
            });
        });

        // Dispelling Darkness Medal Checkbox
        const medalDiv = document.createElement('div');
        medalDiv.classList.add('completion-medal-item');

        const medalCheckbox = document.createElement('input');
        medalCheckbox.type = 'checkbox';
        medalCheckbox.id = 'dispelling-darkness-medal';
        medalCheckbox.checked = localStorage.getItem(medalCheckbox.id) === 'true';

        const medalLabel = document.createElement('span');
        medalLabel.classList.add('completion-medal-label');
        medalLabel.textContent = 'Dispelling Darkness Medal (All Lightroots)';

        medalDiv.appendChild(medalCheckbox);
        medalDiv.appendChild(medalLabel);
        shrineLightrootContent.appendChild(medalDiv);

        if (medalCheckbox.checked) {
            medalDiv.classList.add('completed-medal');
        }

        medalCheckbox.addEventListener('change', () => {
            if (medalCheckbox.checked) {
                localStorage.setItem(medalCheckbox.id, 'true');
                medalDiv.classList.add('completed-medal');
            } else {
                localStorage.removeItem(medalCheckbox.id);
                medalDiv.classList.remove('completed-medal');
            }
            updateCounts();
        });

        updateCounts();
    }

    // --- Function: Render Koroks Section ---
    function renderKoroksSection() {
        koroksContent.innerHTML = '';

        korokRegionsData.forEach(regionGroup => {
            const regionDiv = document.createElement('div');
            regionDiv.classList.add('korok-region-group');

            const regionHeader = document.createElement('h3');
            regionHeader.classList.add('korok-region-group-header');
            regionHeader.id = `${regionGroup.region.replace(/\s+/g, '')}-korok-region-header`;

            regionHeader.textContent = regionGroup.region;
            const regionCountSpan = document.createElement('span');
            regionCountSpan.classList.add('region-completion-count');
            regionHeader.appendChild(regionCountSpan);
            regionDiv.appendChild(regionHeader);

            const regionContent = document.createElement('div');
            regionContent.classList.add('korok-region-group-content');
            regionDiv.appendChild(regionContent);

            regionGroup.subregions.forEach(sub => {
                const subregionItemDiv = document.createElement('div');
                subregionItemDiv.classList.add('korok-subregion-item');

                const subregionCheckbox = document.createElement('input');
                subregionCheckbox.type = 'checkbox';
                const subregionId = `${regionGroup.region.replace(/\s+/g, '')}-${sub.name.replace(/\s+/g, '').replace(/'/g, '')}-korok`;
                subregionCheckbox.id = subregionId;
                subregionCheckbox.checked = localStorage.getItem(subregionId) === 'true';

                const subregionLabel = document.createElement('span');
                subregionLabel.classList.add('korok-subregion-label');
                subregionLabel.textContent = `${sub.name} Korok Seeds`;

                const guideLink = document.createElement('a');
                guideLink.href = regionGroup.link;
                guideLink.target = '_blank';
                guideLink.classList.add('korok-guide-link');
                guideLink.textContent = `Guide for ${regionGroup.region}`;

                subregionItemDiv.appendChild(subregionCheckbox);
                subregionItemDiv.appendChild(subregionLabel);
                subregionItemDiv.appendChild(guideLink);

                if (subregionCheckbox.checked) {
                    subregionItemDiv.classList.add('completed-korok-subregion');
                }

                subregionCheckbox.addEventListener('change', () => {
                    if (subregionCheckbox.checked) {
                        localStorage.setItem(subregionId, 'true');
                        subregionItemDiv.classList.add('completed-korok-subregion');
                    } else {
                        localStorage.removeItem(subregionId);
                        subregionItemDiv.classList.remove('completed-korok-subregion');
                    }
                    updateCounts();
                });

                regionContent.appendChild(subregionItemDiv);
            });

            regionHeader.addEventListener('click', () => {
                toggleContent(regionContent);
            });

            koroksContent.appendChild(regionDiv);
        });

        // Hestu's Gift checkbox
        const hestusGiftDiv = document.createElement('div');
        hestusGiftDiv.classList.add('completion-medal-item');

        const hestusGiftCheckbox = document.createElement('input');
        hestusGiftCheckbox.type = 'checkbox';
        hestusGiftCheckbox.id = 'hestus-gift-obtained';
        hestusGiftCheckbox.checked = localStorage.getItem(hestusGiftCheckbox.id) === 'true';

        const hestusGiftLabel = document.createElement('span');
        hestusGiftLabel.classList.add('completion-medal-label');
        hestusGiftLabel.textContent = "Hestu's Gift Obtained (All 1000 Koroks)";

        hestusGiftDiv.appendChild(hestusGiftCheckbox);
        hestusGiftDiv.appendChild(hestusGiftLabel);
        koroksContent.appendChild(hestusGiftDiv);

        if (hestusGiftCheckbox.checked) {
            hestusGiftDiv.classList.add('completed-medal');
        }

        hestusGiftCheckbox.addEventListener('change', () => {
            if (hestusGiftCheckbox.checked) {
                localStorage.setItem(hestusGiftCheckbox.id, 'true');
                hestusGiftDiv.classList.add('completed-medal');
            } else {
                localStorage.removeItem(hestusGiftCheckbox.id);
                hestusGiftDiv.classList.remove('completed-medal');
            }
            updateCounts();
        });

        updateCounts();
    }


    // Function to render Exploration & Locations Section
    function renderExplorationLocationsSection() {
        explorationLocationsContent.innerHTML = '';

        explorationLocationsData.forEach(categoryGroup => {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('exploration-category-group');

            const categoryHeader = document.createElement('h3');
            categoryHeader.classList.add('exploration-category-group-header');
            const categoryHeaderId = `${categoryGroup.category.replace(/\s+/g, '')}-exploration-category-header`;

            categoryHeader.id = categoryHeaderId;

            categoryHeader.textContent = categoryGroup.category;
            const categoryCountSpan = document.createElement('span');
            categoryCountSpan.classList.add('region-completion-count');
            categoryHeader.appendChild(categoryCountSpan);
            categoryDiv.appendChild(categoryHeader);

            if (categoryGroup.link) {
                const guideLink = document.createElement('a');
                guideLink.href = categoryGroup.link;
                guideLink.target = '_blank';
                guideLink.classList.add('korok-guide-link');
                guideLink.textContent = `Guide for ${categoryGroup.category}`;
                categoryHeader.appendChild(guideLink);
            }

            const categoryContent = document.createElement('div');
            categoryContent.classList.add('exploration-category-group-content');
            categoryDiv.appendChild(categoryContent);

            if (categoryGroup.subcategories) {
                categoryGroup.subcategories.forEach(subCategory => {
                    const subCategoryDiv = document.createElement('div');
                    subCategoryDiv.classList.add('exploration-subcategory-group');

                    const subCategoryHeader = document.createElement('h4');
                    subCategoryHeader.classList.add('exploration-category-group-header');
                    subCategoryHeader.textContent = subCategory.name;
                    subCategoryDiv.appendChild(subCategoryHeader);

                    const subCategoryContent = document.createElement('div');
                    subCategoryContent.classList.add('exploration-category-group-content');
                    subCategoryDiv.appendChild(subCategoryContent);

                    subCategory.items.forEach(item => {
                        const itemDiv = document.createElement('div');
                        itemDiv.classList.add('exploration-location-item');

                        const mainCheckboxGroup = document.createElement('div');
                        mainCheckboxGroup.classList.add('exploration-location-checkbox-group');

                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';

                        // Determine the item name based on whether it's a string or an object
                        const itemName = typeof item === 'object' && item !== null && item.name ? item.name : item;

                        // For compendium, ID should include category and subcategory
                        const itemId = `${categoryGroup.category.replace(/\s+/g, '')}-${subCategory.name.replace(/\s+/g, '')}-${itemName.replace(/\s+/g, '')}`.replace(/[^\w-]/g, '');
                        checkbox.id = itemId;
                        checkbox.checked = localStorage.getItem(itemId) === 'true';

                        const label = document.createElement('span');
                        label.classList.add('exploration-location-label');
                        label.textContent = itemName; // Use itemName for textContent

                        mainCheckboxGroup.appendChild(checkbox);
                        mainCheckboxGroup.appendChild(label);
                        itemDiv.appendChild(mainCheckboxGroup);

                        if (checkbox.checked) {
                            itemDiv.classList.add('completed-location');
                        }

                        checkbox.addEventListener('change', () => {
                            if (checkbox.checked) {
                                localStorage.setItem(itemId, 'true');
                                itemDiv.classList.add('completed-location');
                            } else {
                                localStorage.removeItem(itemId);
                                itemDiv.classList.remove('completed-location');
                            }
                            updateCounts();
                        });
                        subCategoryContent.appendChild(itemDiv);
                    });
                    subCategoryHeader.addEventListener('click', () => {
                        toggleContent(subCategoryContent);
                    });
                    categoryContent.appendChild(subCategoryDiv);
                });
            } else {
                categoryGroup.items.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.classList.add('exploration-location-item');

                    const mainCheckboxGroup = document.createElement('div');
                    mainCheckboxGroup.classList.add('exploration-location-checkbox-group');

                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    const itemId = `${categoryGroup.category.replace(/\s+/g, '')}-${item.name.replace(/\s+/g, '')}`.replace(/[^\w-]/g, '');
                    checkbox.id = itemId;
                    checkbox.checked = localStorage.getItem(itemId) === 'true';

                    const label = document.createElement('span');
                    label.classList.add('exploration-location-label');
                    label.textContent = item.name;

                    mainCheckboxGroup.appendChild(checkbox);
                    mainCheckboxGroup.appendChild(label);
                    itemDiv.appendChild(mainCheckboxGroup);

                    if (categoryGroup.category === "Caves") {
                        const bubbulfrogContainer = document.createElement('div');
                        bubbulfrogContainer.classList.add('bubbulfrog-checkbox-container');

                        const bubbulfrogCheckbox = document.createElement('input');
                        bubbulfrogCheckbox.type = 'checkbox';
                        const bubbulfrogId = `${itemId}-bubbulfrog`;
                        bubbulfrogCheckbox.id = bubbulfrogId;
                        bubbulfrogCheckbox.checked = localStorage.getItem(bubbulfrogId) === 'true';

                        const bubbulfrogLabel = document.createElement('span');
                        bubbulfrogLabel.classList.add('bubbulfrog-label');
                        bubbulfrogLabel.textContent = 'Bubbul Gem Claimed';

                        bubbulfrogContainer.appendChild(bubbulfrogCheckbox);
                        bubbulfrogContainer.appendChild(bubbulfrogLabel);
                        itemDiv.appendChild(bubbulfrogContainer);

                        if (bubbulfrogCheckbox.checked) {
                            itemDiv.classList.add('completed-bubbulfrog');
                        }

                        bubbulfrogCheckbox.addEventListener('change', () => {
                            if (bubbulfrogCheckbox.checked) {
                                localStorage.setItem(bubbulfrogId, 'true');
                                itemDiv.classList.add('completed-bubbulfrog');
                            } else {
                                localStorage.removeItem(bubbulfrogId);
                                itemDiv.classList.remove('completed-bubbulfrog');
                            }
                            updateCounts();
                        });
                    }

                    if (checkbox.checked) {
                        itemDiv.classList.add('completed-location');
                    }

                    checkbox.addEventListener('change', () => {
                        if (checkbox.checked) {
                            localStorage.setItem(itemId, 'true');
                            itemDiv.classList.add('completed-location');
                        } else {
                            localStorage.removeItem(itemId);
                            itemDiv.classList.remove('completed-location');
                        }
                        updateCounts();
                    });

                    categoryContent.appendChild(itemDiv);
                });

                if (categoryGroup.category === "Caves") {
                    const caveEntrancesDiv = document.createElement('div');
                    caveEntrancesDiv.classList.add('exploration-location-item', 'cave-entrance-total-item');

                    const mainCheckboxGroup = document.createElement('div');
                    mainCheckboxGroup.classList.add('exploration-location-checkbox-group');

                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = 'all-191-cave-entrances';
                    checkbox.checked = localStorage.getItem(checkbox.id) === 'true';

                    const label = document.createElement('span');
                    label.classList.add('exploration-location-label');
                    label.innerHTML = 'All **191** Cave Entrances';

                    mainCheckboxGroup.appendChild(checkbox);
                    mainCheckboxGroup.appendChild(label);
                    caveEntrancesDiv.appendChild(mainCheckboxGroup);

                    if (checkbox.checked) {
                        caveEntrancesDiv.classList.add('completed-location');
                    }

                    checkbox.addEventListener('change', () => {
                        if (checkbox.checked) {
                            localStorage.setItem(checkbox.id, 'true');
                            caveEntrancesDiv.classList.add('completed-location');
                        } else {
                            localStorage.removeItem(checkbox.id);
                            caveEntrancesDiv.classList.remove('completed-location');
                        }
                        updateCounts();
                    });
                    categoryContent.appendChild(caveEntrancesDiv);
                }
            }

            categoryHeader.addEventListener('click', () => {
                toggleContent(categoryContent);
            });

            explorationLocationsContent.appendChild(categoryDiv);
        });
        updateCounts();
    }

    // Function to render Quests Section
    function renderQuestsSection() {
        questsContent.innerHTML = '';

        questsData.forEach(categoryGroup => {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('quest-category-group');

            const categoryHeader = document.createElement('h3');
            categoryHeader.classList.add('quest-category-group-header');
            const categoryHeaderId = `${categoryGroup.category.replace(/\s+/g, '').replace(/[^\w-]/g, '')}-quest-category-header`;
            categoryHeader.id = categoryHeaderId;

            categoryHeader.textContent = categoryGroup.category;
            const categoryCountSpan = document.createElement('span');
            categoryCountSpan.classList.add('region-completion-count');
            categoryHeader.appendChild(categoryCountSpan);
            categoryDiv.appendChild(categoryHeader);

            const categoryItemsContainer = document.createElement('div');
            categoryItemsContainer.classList.add('quest-category-group-content');
            categoryItemsContainer.id = `${categoryGroup.category.replace(/\s+/g, '').replace(/[^\w-]/g, '')}-quest-content`;
            categoryDiv.appendChild(categoryItemsContainer);

            categoryGroup.items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('quest-item');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                const itemId = `${categoryGroup.category.replace(/\s+/g, '').replace(/[^\w-]/g, '')}-${item.name.replace(/\s+/g, '').replace(/[^\w-]/g, '')}`;
                checkbox.id = itemId;
                checkbox.checked = localStorage.getItem(itemId) === 'true';

                const label = document.createElement('span');
                label.classList.add('quest-label');
                label.textContent = item.name;

                itemDiv.appendChild(checkbox);
                itemDiv.appendChild(label);

                if (item.location) {
                    const locationSpan = document.createElement('span');
                    locationSpan.classList.add('quest-location');
                    locationSpan.textContent = ` (${item.location})`;
                    itemDiv.appendChild(locationSpan);
                } else if (item.associatedShrine) {
                    const shrineSpan = document.createElement('span');
                    shrineSpan.classList.add('quest-associated-shrine');
                    shrineSpan.textContent = ` (for ${item.associatedShrine})`;
                    itemDiv.appendChild(shrineSpan);
                }

                if (checkbox.checked) {
                    itemDiv.classList.add('completed-quest');
                }

                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        localStorage.setItem(itemId, 'true');
                        itemDiv.classList.add('completed-quest');
                    } else {
                        localStorage.removeItem(itemId);
                        itemDiv.classList.remove('completed-quest');
                    }
                    updateCounts();
                });

                categoryItemsContainer.appendChild(itemDiv);
            });

            categoryHeader.addEventListener('click', () => {
                toggleContent(categoryItemsContainer);
            });

            questsContent.appendChild(categoryDiv);
        });

        updateCounts();
    }
    // Function to render Collection & Progression Section
    function renderCollectionProgressionSection() {
        collectionProgressionContent.innerHTML = '';

        // Dragon Tears
        const dragonTearsDiv = document.createElement('div');
        dragonTearsDiv.classList.add('collection-category-group');
        const dragonTearsHeader = document.createElement('h3');
        dragonTearsHeader.classList.add('collection-category-group-header');
        dragonTearsHeader.id = 'DragonTears-collection-category-header';
        dragonTearsHeader.textContent = 'Dragon Tears';
        const dragonTearsCountSpan = document.createElement('span');
        dragonTearsCountSpan.classList.add('region-completion-count');
        dragonTearsHeader.appendChild(dragonTearsCountSpan);
        dragonTearsDiv.appendChild(dragonTearsHeader);
        const dragonTearsContent = document.createElement('div');
        dragonTearsContent.classList.add('collection-category-group-content');
        dragonTearsDiv.appendChild(dragonTearsContent);

        dragonTearsData.forEach(tear => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('collection-item');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = tear.id;
            checkbox.checked = localStorage.getItem(tear.id) === 'true';
            const label = document.createElement('span');
            label.classList.add('collection-label');
            label.textContent = tear.name;
            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(label);
            if (checkbox.checked) itemDiv.classList.add('completed-collection-item');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    localStorage.setItem(tear.id, 'true');
                    itemDiv.classList.add('completed-collection-item');
                } else {
                    localStorage.removeItem(tear.id);
                    itemDiv.classList.remove('completed-collection-item');
                }
                updateCounts();
            });
            dragonTearsContent.appendChild(itemDiv);
        });
        dragonTearsHeader.addEventListener('click', () => { toggleContent(dragonTearsContent); });
        collectionProgressionContent.appendChild(dragonTearsDiv);

        // Stone Tablets
        const stoneTabletsDiv = document.createElement('div');
        stoneTabletsDiv.classList.add('collection-category-group');
        const stoneTabletsHeader = document.createElement('h3');
        stoneTabletsHeader.classList.add('collection-category-group-header');
        stoneTabletsHeader.id = 'StoneTablets-collection-category-header';
        stoneTabletsHeader.textContent = 'Ancient Stone Tablets';
        const stoneTabletsCountSpan = document.createElement('span');
        stoneTabletsCountSpan.classList.add('region-completion-count');
        stoneTabletsHeader.appendChild(stoneTabletsCountSpan);
        stoneTabletsDiv.appendChild(stoneTabletsHeader);
        const stoneTabletsContent = document.createElement('div');
        stoneTabletsContent.classList.add('collection-category-group-content');
        stoneTabletsDiv.appendChild(stoneTabletsContent);

        stoneTabletsData.forEach(tablet => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('collection-item');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = tablet.id;
            checkbox.checked = localStorage.getItem(tablet.id) === 'true';
            const label = document.createElement('span');
            label.classList.add('collection-label');
            label.textContent = tablet.name;
            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(label);
            if (checkbox.checked) itemDiv.classList.add('completed-collection-item');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    localStorage.setItem(tablet.id, 'true');
                    itemDiv.classList.add('completed-collection-item');
                } else {
                    localStorage.removeItem(tablet.id);
                    itemDiv.classList.remove('completed-collection-item');
                }
                updateCounts();
            });
            stoneTabletsContent.appendChild(itemDiv);
        });
        stoneTabletsHeader.addEventListener('click', () => { toggleContent(stoneTabletsContent); });
        collectionProgressionContent.appendChild(stoneTabletsDiv);

        // Sage's Wills
        const sagesWillsDiv = document.createElement('div');
        sagesWillsDiv.classList.add('collection-category-group');
        const sagesWillsHeader = document.createElement('h3');
        sagesWillsHeader.classList.add('collection-category-group-header');
        sagesWillsHeader.id = 'SagesWills-collection-category-header';
        sagesWillsHeader.textContent = "Sage's Wills";
        const sagesWillsCountSpan = document.createElement('span');
        sagesWillsCountSpan.classList.add('region-completion-count');
        sagesWillsHeader.appendChild(sagesWillsCountSpan);
        sagesWillsDiv.appendChild(sagesWillsHeader);
        const sagesWillsContent = document.createElement('div');
        sagesWillsContent.classList.add('collection-category-group-content');
        sagesWillsDiv.appendChild(sagesWillsContent);

        sagesWillsData.forEach(will => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('collection-item');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = will.id;
            checkbox.checked = localStorage.getItem(will.id) === 'true';
            const label = document.createElement('span');
            label.classList.add('collection-label');
            label.textContent = will.name;
            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(label);
            if (checkbox.checked) itemDiv.classList.add('completed-collection-item');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    localStorage.setItem(will.id, 'true');
                    itemDiv.classList.add('completed-collection-item');
                } else {
                    localStorage.removeItem(will.id);
                    itemDiv.classList.remove('completed-collection-item');
                }
                updateCounts();
            });
            sagesWillsContent.appendChild(itemDiv);
        });

        // All 5 Solemn Vows checkbox
        const solemnVowsDiv = document.createElement('div');
        solemnVowsDiv.classList.add('completion-medal-item');
        const solemnVowsCheckbox = document.createElement('input');
        solemnVowsCheckbox.type = 'checkbox';
        solemnVowsCheckbox.id = 'all-5-solemn-vows';
        solemnVowsCheckbox.checked = localStorage.getItem(solemnVowsCheckbox.id) === 'true';
        const solemnVowsLabel = document.createElement('span');
        solemnVowsLabel.classList.add('completion-medal-label');
        solemnVowsLabel.textContent = 'All 5 Solemn Vows';
        solemnVowsDiv.appendChild(solemnVowsCheckbox);
        solemnVowsDiv.appendChild(solemnVowsLabel);
        if (solemnVowsCheckbox.checked) solemnVowsDiv.classList.add('completed-medal');
        solemnVowsCheckbox.addEventListener('change', () => {
            if (solemnVowsCheckbox.checked) {
                localStorage.setItem(solemnVowsCheckbox.id, 'true');
                solemnVowsDiv.classList.add('completed-medal');
            } else {
                localStorage.removeItem(solemnVowsCheckbox.id);
                solemnVowsDiv.classList.remove('completed-medal');
            }
            updateCounts();
        });
        sagesWillsContent.appendChild(solemnVowsDiv);

        sagesWillsHeader.addEventListener('click', () => { toggleContent(sagesWillsContent); });
        collectionProgressionContent.appendChild(sagesWillsDiv);

        // Schematics
        const schematicsDiv = document.createElement('div');
        schematicsDiv.classList.add('collection-category-group');
        const schematicsHeader = document.createElement('h3');
        schematicsHeader.classList.add('collection-category-group-header');
        schematicsHeader.id = 'Schematics-collection-category-header';
        schematicsHeader.textContent = 'Schematics';
        const schematicsCountSpan = document.createElement('span');
        schematicsCountSpan.classList.add('region-completion-count');
        schematicsHeader.appendChild(schematicsCountSpan);
        schematicsDiv.appendChild(schematicsHeader);
        const schematicsContent = document.createElement('div');
        schematicsContent.classList.add('collection-category-group-content');
        schematicsDiv.appendChild(schematicsContent);

        schematicsData.forEach(schematic => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('collection-item');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = schematic.id;
            checkbox.checked = localStorage.getItem(schematic.id) === 'true';
            const label = document.createElement('span');
            label.classList.add('collection-label');
            label.textContent = schematic.name;
            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(label);
            if (checkbox.checked) itemDiv.classList.add('completed-collection-item');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    localStorage.setItem(schematic.id, 'true');
                    itemDiv.classList.add('completed-collection-item');
                } else {
                    localStorage.removeItem(schematic.id);
                    itemDiv.classList.remove('completed-collection-item');
                }
                updateCounts();
            });
            schematicsContent.appendChild(itemDiv);
        });
        schematicsHeader.addEventListener('click', () => { toggleContent(schematicsContent); });
        collectionProgressionContent.appendChild(schematicsDiv);

        // Stats (as a sub-tab within Collection & Progression)
        const statsDiv = document.createElement('div');
        statsDiv.classList.add('collection-category-group');
        const statsHeader = document.createElement('h3');
        statsHeader.classList.add('collection-category-group-header');
        statsHeader.id = 'Stats-collection-category-header';
        statsHeader.textContent = 'Stats';
        const statsCountSpan = document.createElement('span');
        statsCountSpan.classList.add('region-completion-count');
        statsHeader.appendChild(statsCountSpan);
        statsDiv.appendChild(statsHeader);
        const statsContent = document.createElement('div');
        statsContent.classList.add('collection-category-group-content');
        statsDiv.appendChild(statsContent);

        statsData.forEach(stat => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('collection-item');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = stat.id;
            checkbox.checked = localStorage.getItem(stat.id) === 'true';
            const label = document.createElement('span');
            label.classList.add('collection-label');
            label.textContent = stat.name;
            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(label);
            if (checkbox.checked) itemDiv.classList.add('completed-collection-item');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    localStorage.setItem(stat.id, 'true');
                    itemDiv.classList.add('completed-collection-item');
                } else {
                    localStorage.removeItem(stat.id);
                    itemDiv.classList.remove('completed-collection-item');
                }
                updateCounts();
            });
            statsContent.appendChild(itemDiv);
        });
        statsHeader.addEventListener('click', () => { toggleContent(statsContent); });
        collectionProgressionContent.appendChild(statsDiv);

        updateCounts();
    }

    // Function to render Armors & Fabrics Section
    function renderArmorsFabricsSection() {
        armorsFabricsContent.innerHTML = '';

        // Armors Sub-category
        const armorsDiv = document.createElement('div');
        armorsDiv.classList.add('collection-category-group');
        const armorsHeader = document.createElement('h3');
        armorsHeader.classList.add('armor-category-group-header');
        armorsHeader.id = 'Armors-armor-category-group-header';
        armorsHeader.textContent = 'Armors';
        const armorsCountSpan = document.createElement('span');
        armorsCountSpan.classList.add('region-completion-count');
        armorsHeader.appendChild(armorsCountSpan);
        armorsDiv.appendChild(armorsHeader);
        const armorsContent = document.createElement('div');
        armorsContent.classList.add('armor-subcategory-content');
        armorsDiv.appendChild(armorsContent);

        armorsData.forEach(armor => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('armor-item');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            const armorId = `armor-${armor.name.replace(/\s+/g, '').replace(/[^\w-]/g, '')}`;
            checkbox.id = armorId;
            checkbox.checked = localStorage.getItem(armorId) === 'true';

            const label = document.createElement('span');
            label.classList.add('armor-label');
            label.textContent = armor.name;

            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(label);

            if (armor.upgradeable) {
                const upgradeContainer = document.createElement('div');
                upgradeContainer.classList.add('upgrade-checkbox-container');
                const upgradeCheckbox = document.createElement('input');
                upgradeCheckbox.type = 'checkbox';
                const upgradeId = `${armorId}-4-stars`;
                upgradeCheckbox.id = upgradeId;
                upgradeCheckbox.checked = localStorage.getItem(upgradeId) === 'true';

                const starIcon = document.createElement('span');
                starIcon.classList.add('star-icon');
                starIcon.textContent = '★';

                const upgradeLabel = document.createElement('span');
                upgradeLabel.textContent = '4 Stars';

                upgradeContainer.appendChild(upgradeCheckbox);
                upgradeContainer.appendChild(starIcon);
                upgradeContainer.appendChild(upgradeLabel);
                itemDiv.appendChild(upgradeContainer);

                upgradeCheckbox.addEventListener('change', () => {
                    if (upgradeCheckbox.checked) {
                        localStorage.setItem(upgradeId, 'true');
                    } else {
                        localStorage.removeItem(upgradeId);
                    }
                    updateCounts();
                });
            }

            if (checkbox.checked) itemDiv.classList.add('completed-armor');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    localStorage.setItem(armorId, 'true');
                    itemDiv.classList.add('completed-armor');
                } else {
                    localStorage.removeItem(armorId);
                    itemDiv.classList.remove('completed-armor');
                }
                updateCounts();
            });
            armorsContent.appendChild(itemDiv);
        });
        armorsHeader.addEventListener('click', () => { toggleContent(armorsContent); });
        armorsFabricsContent.appendChild(armorsDiv);


        // Fabrics Sub-category
        const fabricsDiv = document.createElement('div');
        fabricsDiv.classList.add('collection-category-group');
        const fabricsHeader = document.createElement('h3');
        fabricsHeader.classList.add('fabric-category-group-header');
        fabricsHeader.id = 'Fabrics-fabric-category-group-header';
        fabricsHeader.textContent = 'Fabrics';
        const fabricsCountSpan = document.createElement('span');
        fabricsCountSpan.classList.add('region-completion-count');
        fabricsHeader.appendChild(fabricsCountSpan);
        fabricsDiv.appendChild(fabricsHeader);
        const fabricsContent = document.createElement('div');
        fabricsContent.classList.add('fabric-subcategory-content');
        fabricsDiv.appendChild(fabricsContent);

        // Regular Fabrics Sub-sub-category
        const regularFabricsSubDiv = document.createElement('div');
        regularFabricsSubDiv.classList.add('collection-subcategory-group');
        const regularFabricsSubHeader = document.createElement('h4');
        regularFabricsSubHeader.classList.add('fabric-subcategory-header');
        regularFabricsSubHeader.id = 'RegularFabrics-fabric-subcategory-header';
        regularFabricsSubHeader.textContent = 'Regular Fabrics';
        const regularFabricsSubCountSpan = document.createElement('span');
        regularFabricsSubCountSpan.classList.add('region-completion-count');
        regularFabricsSubHeader.appendChild(regularFabricsSubCountSpan);
        regularFabricsSubDiv.appendChild(regularFabricsSubHeader);
        const regularFabricsSubContent = document.createElement('div');
        regularFabricsSubContent.classList.add('collection-subcategory-content');
        regularFabricsSubDiv.appendChild(regularFabricsSubContent);

        regularFabricsData.forEach(fabric => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('fabric-item');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            const fabricId = `fabric-${fabric.name.replace(/\s+/g, '').replace(/[^\w-]/g, '')}`;
            checkbox.id = fabricId;
            checkbox.checked = localStorage.getItem(fabricId) === 'true';

            const label = document.createElement('span');
            label.classList.add('fabric-label');
            label.textContent = fabric.name;

            const obtainmentSpan = document.createElement('span');
            obtainmentSpan.classList.add('fabric-obtainment');
            obtainmentSpan.textContent = `(Obtainment: ${fabric.obtainment})`;

            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(label);
            itemDiv.appendChild(obtainmentSpan);

            if (checkbox.checked) itemDiv.classList.add('completed-fabric');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    localStorage.setItem(fabricId, 'true');
                    itemDiv.classList.add('completed-fabric');
                } else {
                    localStorage.removeItem(fabricId);
                    itemDiv.classList.remove('completed-fabric');
                }
                updateCounts();
            });
            regularFabricsSubContent.appendChild(itemDiv);
        });
        regularFabricsSubHeader.addEventListener('click', () => { toggleContent(regularFabricsSubContent); });
        fabricsContent.appendChild(regularFabricsSubDiv);

        // Amiibo Exclusive Fabrics Sub-sub-category
        const amiiboFabricsSubDiv = document.createElement('div');
        amiiboFabricsSubDiv.classList.add('collection-subcategory-group');
        const amiiboFabricsSubHeader = document.createElement('h4');
        amiiboFabricsSubHeader.classList.add('fabric-subcategory-header');
        amiiboFabricsSubHeader.id = 'AmiiboExclusive-fabric-subcategory-header';
        amiiboFabricsSubHeader.textContent = 'Amiibo Exclusive';
        const amiiboFabricsSubCountSpan = document.createElement('span');
        amiiboFabricsSubCountSpan.classList.add('region-completion-count');
        amiiboFabricsSubHeader.appendChild(amiiboFabricsSubCountSpan);
        amiiboFabricsSubDiv.appendChild(amiiboFabricsSubHeader);
        const amiiboFabricsSubContent = document.createElement('div');
        amiiboFabricsSubContent.classList.add('collection-subcategory-content');
        amiiboFabricsSubDiv.appendChild(amiiboFabricsSubContent);

        amiiboFabricsData.forEach(fabric => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('fabric-item');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            const fabricId = `fabric-${fabric.name.replace(/\s+/g, '').replace(/[^\w-]/g, '')}`;
            checkbox.id = fabricId;
            checkbox.checked = localStorage.getItem(fabricId) === 'true';

            const label = document.createElement('span');
            label.classList.add('fabric-label');
            label.textContent = fabric.name;

            const obtainmentSpan = document.createElement('span');
            obtainmentSpan.classList.add('fabric-obtainment');
            obtainmentSpan.textContent = `(Obtainment: ${fabric.obtainment})`;

            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(label);
            itemDiv.appendChild(obtainmentSpan);

            if (checkbox.checked) itemDiv.classList.add('completed-fabric');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    localStorage.setItem(fabricId, 'true');
                    itemDiv.classList.add('completed-fabric');
                } else {
                    localStorage.removeItem(fabricId);
                    itemDiv.classList.remove('completed-fabric');
                }
                updateCounts();
            });
            amiiboFabricsSubContent.appendChild(itemDiv);
        });
        amiiboFabricsSubHeader.addEventListener('click', () => { toggleContent(amiiboFabricsSubContent); });
        fabricsContent.appendChild(amiiboFabricsSubDiv);

        fabricsHeader.addEventListener('click', () => { toggleContent(fabricsContent); });
        armorsFabricsContent.appendChild(fabricsDiv);

        updateCounts();
    }

    // Function to render Completionist Medals & Unique Rewards Section
    function renderCompletionistMedalsSection() {
        completionistMedalsContent.innerHTML = '';

        // Monster Medals
        const monsterMedalsDiv = document.createElement('div');
        monsterMedalsDiv.classList.add('collection-category-group');
        const monsterMedalsHeader = document.createElement('h3');
        monsterMedalsHeader.classList.add('medals-category-group-header');
        monsterMedalsHeader.id = 'MonsterMedals-medals-category-group-header';
        monsterMedalsHeader.textContent = 'All Monster Medals';
        const monsterMedalsCountSpan = document.createElement('span');
        monsterMedalsCountSpan.classList.add('region-completion-count');
        monsterMedalsHeader.appendChild(monsterMedalsCountSpan);
        monsterMedalsDiv.appendChild(monsterMedalsHeader);
        const monsterMedalsContent = document.createElement('div');
        monsterMedalsContent.classList.add('medals-subcategory-content');
        monsterMedalsDiv.appendChild(monsterMedalsContent);

        monsterMedalsData.forEach(medal => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('medal-item');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = medal.id;
            checkbox.checked = localStorage.getItem(medal.id) === 'true';
            const label = document.createElement('span');
            label.classList.add('medal-label');
            label.textContent = medal.name;
            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(label);
            if (checkbox.checked) itemDiv.classList.add('completed-medal-item');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    localStorage.setItem(medal.id, 'true');
                    itemDiv.classList.add('completed-medal-item');
                } else {
                    localStorage.removeItem(medal.id);
                    itemDiv.classList.remove('completed-medal-item');
                }
                updateCounts();
            });
            monsterMedalsContent.appendChild(itemDiv);
        });
        monsterMedalsHeader.addEventListener('click', () => { toggleContent(monsterMedalsContent); });
        completionistMedalsContent.appendChild(monsterMedalsDiv);

        // Horse Saddles and Bridles
        const horseGearDiv = document.createElement('div');
        horseGearDiv.classList.add('collection-category-group');
        const horseGearHeader = document.createElement('h3');
        horseGearHeader.classList.add('horse-gear-category-group-header');
        horseGearHeader.id = 'HorseSaddlesAndBridles-horse-gear-category-group-header';
        horseGearHeader.textContent = 'All Horse Saddles and Bridles';
        const horseGearCountSpan = document.createElement('span');
        horseGearCountSpan.classList.add('region-completion-count');
        horseGearHeader.appendChild(horseGearCountSpan);
        horseGearDiv.appendChild(horseGearHeader);
        const horseGearContent = document.createElement('div');
        horseGearContent.classList.add('horse-gear-subcategory-content');
        horseGearDiv.appendChild(horseGearContent);

        horseGearData.forEach(gear => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('horse-gear-item');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = gear.id;
            checkbox.checked = localStorage.getItem(gear.id) === 'true';
            const label = document.createElement('span');
            label.classList.add('horse-gear-label');
            label.textContent = gear.name;
            itemDiv.appendChild(checkbox);
            itemDiv.appendChild(label);
            if (checkbox.checked) itemDiv.classList.add('completed-horse-gear');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    localStorage.setItem(gear.id, 'true');
                    itemDiv.classList.add('completed-horse-gear');
                } else {
                    localStorage.removeItem(gear.id);
                    itemDiv.classList.remove('completed-horse-gear');
                }
                updateCounts();
            });
            horseGearContent.appendChild(itemDiv);
        });
        horseGearHeader.addEventListener('click', () => { toggleContent(horseGearContent); });
        completionistMedalsContent.appendChild(horseGearDiv);

        updateCounts();
    }

    // NEW: Function to render Extreme Goals Section
    function renderExtremeGoalsSection() {
        extremeGoalsContent.innerHTML = '';

        extremeGoalsMasterData.forEach(masterCategory => {
            const masterCategoryDiv = document.createElement('div');
            masterCategoryDiv.classList.add('extreme-goals-category-group'); // Use a different class for this level

            const masterCategoryHeader = document.createElement('h3');
            masterCategoryHeader.classList.add('extreme-goals-subcategory-header'); // Apply flame effect to this header
            masterCategoryHeader.id = `ExtremeGoals-${masterCategory.category.replace(/\s+/g, '').replace(/[^\w-]/g, '')}-header`;
            masterCategoryHeader.textContent = masterCategory.category;

            const masterCategoryCountSpan = document.createElement('span');
            masterCategoryCountSpan.classList.add('region-completion-count');
            masterCategoryHeader.appendChild(masterCategoryCountSpan);
            masterCategoryDiv.appendChild(masterCategoryHeader);

            const masterCategoryContent = document.createElement('div');
            masterCategoryContent.classList.add('extreme-goals-category-group-content');
            masterCategoryDiv.appendChild(masterCategoryContent);

            if (masterCategory.subcategories) {
                masterCategory.subcategories.forEach(categoryGroup => {
                    const categoryDiv = document.createElement('div');
                    categoryDiv.classList.add('extreme-goals-subcategory-group');

                    const categoryHeader = document.createElement('h4');
                    categoryHeader.classList.add('extreme-goals-subcategory-header'); // Apply flame effect to this header too
                    const categoryHeaderId = `ExtremeGoals-${categoryGroup.name.replace(/\s+/g, '').replace(/[^\w-]/g, '')}-subcategory-header`;
                    categoryHeader.id = categoryHeaderId;
                    categoryHeader.textContent = categoryGroup.name;

                    const categoryCountSpan = document.createElement('span');
                    categoryCountSpan.classList.add('region-completion-count');
                    categoryHeader.appendChild(categoryCountSpan);
                    categoryDiv.appendChild(categoryHeader);

                    const categoryItemsContainer = document.createElement('div');
                    categoryItemsContainer.classList.add('extreme-goals-subcategory-content');
                    categoryDiv.appendChild(categoryItemsContainer);

                    categoryGroup.items.forEach(item => {
                        const itemDiv = document.createElement('div');
                        itemDiv.classList.add('extreme-goal-item');

                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        const itemId = `extreme-999-${categoryGroup.name.replace(/\s+/g, '').replace(/[^\w-]/g, '')}-${item.replace(/\s+/g, '').replace(/[^\w-]/g, '')}`;
                        checkbox.id = itemId;
                        checkbox.checked = localStorage.getItem(itemId) === 'true';

                        const label = document.createElement('span');
                        label.classList.add('extreme-goal-label');
                        label.textContent = `999 ${item}`;

                        itemDiv.appendChild(checkbox);
                        itemDiv.appendChild(label);

                        if (checkbox.checked) {
                            itemDiv.classList.add('completed-extreme-goal');
                        }

                        checkbox.addEventListener('change', () => {
                            if (checkbox.checked) {
                                localStorage.setItem(itemId, 'true');
                                itemDiv.classList.add('completed-extreme-goal');
                            } else {
                                localStorage.removeItem(itemId);
                                itemDiv.classList.remove('completed-extreme-goal');
                            }
                            updateCounts();
                        });
                        categoryItemsContainer.appendChild(itemDiv);
                    });

                    categoryHeader.addEventListener('click', () => {
                        toggleContent(categoryItemsContainer);
                    });

                    masterCategoryContent.appendChild(categoryDiv);
                });
            }

            masterCategoryHeader.addEventListener('click', () => {
                toggleContent(masterCategoryContent);
            });

            extremeGoalsContent.appendChild(masterCategoryDiv);
        });
        updateCounts();
    }


    // Main category dropdown functionality for Shrines & Lightroots
    const shrineLightrootHeader = document.getElementById('shrine-lightroot-header');
    if (shrineLightrootHeader) {
        shrineLightrootHeader.addEventListener('click', () => {
            const content = document.getElementById('shrine-lightroot-content');
            toggleContent(content);
        });
    }

    // Main category dropdown functionality for Koroks
    const koroksHeader = document.getElementById('koroks-header');
    if (koroksHeader) {
        koroksHeader.addEventListener('click', () => {
            const content = document.getElementById('koroks-content');
            toggleContent(content);
        });
    }

    // Main category dropdown functionality for Exploration & Locations
    const explorationLocationsHeader = document.getElementById('exploration-locations-header');
    if (explorationLocationsHeader) {
        explorationLocationsHeader.addEventListener('click', () => {
            const content = document.getElementById('exploration-locations-content');
            toggleContent(content);
        });
    }

    // Main category dropdown functionality for Quests
    const questsHeader = document.getElementById('quests-header');
    if (questsHeader) {
        questsHeader.addEventListener('click', () => {
            const content = document.getElementById('quests-content');
            toggleContent(content);
        });
    }

    // Main category dropdown functionality for Collection & Progression
    const collectionProgressionHeader = document.getElementById('collection-progression-header');
    if (collectionProgressionHeader) {
        collectionProgressionHeader.addEventListener('click', () => {
            const content = document.getElementById('collection-progression-content');
            toggleContent(content);
        });
    }

    // Main category dropdown functionality for Armors & Fabrics
    const armorsFabricsHeader = document.getElementById('armors-fabrics-header');
    if (armorsFabricsHeader) {
        armorsFabricsHeader.addEventListener('click', () => {
            const content = document.getElementById('armors-fabrics-content');
            toggleContent(content);
        });
    }

    // Main category dropdown functionality for Completionist Medals & Unique Rewards
    const completionistMedalsHeader = document.getElementById('completionist-medals-header');
    if (completionistMedalsHeader) {
        completionistMedalsHeader.addEventListener('click', () => {
            const content = document.getElementById('completionist-medals-content');
            toggleContent(content);
        });
    }

    // NEW: Main category dropdown functionality for Extreme Goals
    const extremeGoalsHeader = document.getElementById('extreme-goals-header');
    if (extremeGoalsHeader) {
        extremeGoalsHeader.addEventListener('click', () => {
            const content = document.getElementById('extreme-goals-content');
            toggleContent(content);
        });
    }


    // Initial rendering and count update when the DOM is fully loaded
    renderShrineLightroots();
    renderKoroksSection();
    renderExplorationLocationsSection();
    renderQuestsSection();
    renderCollectionProgressionSection();
    renderArmorsFabricsSection();
    renderCompletionistMedalsSection();
    renderExtremeGoalsSection(); // NEW: Call the new render function
});
