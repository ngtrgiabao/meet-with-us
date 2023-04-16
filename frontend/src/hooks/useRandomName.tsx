import React from "react";

export const useRandomName = () => {
    const nicknames: { [key: number]: string } = {
        1: "Mít 🍈🐶",
        2: "Bánh bao 🥟🐱",
        3: "Sữa chua 🍶🐹",
        4: "Cơm rang 🍚🐶",
        5: "Chuột Mickey 🐭🐱",
        6: "Tôm tít 🦐🐶",
        7: "Táo 🍎🐹",
        8: "Trà sữa 🥤🐱",
        9: "Cún cưng 🐶❤️",
        10: "Mèo Tom 🐱📱",
        11: "Gấu trúc 🐼🍵",
        12: "Cơm tấm 🍚🐶",
        13: "Vịt quay 🦆🐱",
        14: "Bánh gato 🍰🐹",
        15: "Bánh mì 🥪🐶",
        16: "Thỏ con 🐰🐱",
        17: "Kem dâu 🍨🐹",
        18: "Chim cánh cụt 🐧🧊",
        19: "Sườn xào chua ngọt 🍖🐶",
        20: "Mèo Garfield 🐱🍽️",
        21: "Ngựa vằn 🦓🌿",
        22: "Bánh flan 🍮🐹",
        23: "Bánh rán 🍩🐶",
        24: "Thỏ thần tốc 🐰🥕",
        25: "Bạch tuộc 🐙🍜",
        26: "Chó Husky 🐶❄️",
        27: "Dê con 🐐🌱",
        28: "Sushi 🍣🐱",
        29: "Lợn xào xả 🍖🐷",
        30: "Cá heo 🐬💦",
        31: "Bánh kem 🎂🐹",
        32: "Bướm 🦋🌸",
        33: "Bò bít tết 🥩🐶",
        34: "Thỏ Alice 🐰🎩",
        35: "Gấu Bông 🧸❤️",
        36: "Tôm hùm 🦞🔪",
        37: "Kem trộn 🍦🐱",
        38: "Chó Corgi",
        39: "Chó sói 🐺🌕",
        40: "Vịt Donald 🦆🎩",
        41: "Gà rán 🍗🐶",
        42: "Gấu Pooh 🐻🍯",
        43: "Bánh su kem 🥧🐹",
        44: "Bạch tuộc Paul 🐙🔮",
        45: "Bướm đêm 🦋🌃",
        46: "Bò viên 🍖🐶",
        47: "Thỏ Bugs 🐰🥕",
        48: "Sư tử 🦁🌞",
        49: "Mèo Kitty 🐱🎀",
        50: "Gà tây 🦃🍁",
    };

    const randomNickname = (number: number) => {
        return nicknames[number] || "user";
    };

    const [nickname, setNickname] = React.useState<string>("");

    React.useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 50) + 1;
        setNickname(randomNickname(randomNumber));
    }, []);

    return nickname;
};
