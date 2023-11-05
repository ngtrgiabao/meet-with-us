import React from "react";

export const useRandomName = () => {
    const nicknames: { [key: number]: string } = {
        1: "Mít 🍈",
        2: "Bánh bao 🥟",
        3: "Sữa chua 🍶",
        4: "Cơm rang 🍚",
        5: "Elsa",
        6: "Tôm tít 🦐",
        7: "Táo 🍎",
        8: "Trà sữa 🥤",
        9: "Mì cay 🌶️",
        10: "Mèo Tom 🐱",
        11: "Gấu trúc 🐼",
        12: "Cơm tấm 🍚",
        13: "Vịt quay 🦆",
        14: "Bánh gato 🍰",
        15: "Bánh mì 🥪",
        16: "Thỏ con 🐰",
        17: "Kem dâu 🍨",
        18: "Chim cánh cụt 🐧",
        19: "Sườn xào chua ngọt 🍖",
        20: "Mèo Garfield 🐱",
        21: "Ngựa vằn 🦓",
        22: "Xinh thía",
        23: "The king 👑",
        24: "Ông anh 96",
        25: "Bạch tuộc 🐙",
        26: "Chó Husky 🐶",
        27: "Dê con 🐐",
        28: "Sushi 🍣",
        29: "Lợn xào xả 🍖",
        30: "Đã cái nư",
        31: "Tím mộng mơ",
        32: "Em bé",
        33: "Zzz...Zzz",
        34: "Thỏ Alice 🐰",
        35: "Gấu Bông 🧸",
        36: "Tôm hùm 🦞",
        37: "Kem trộn 🍦",
        38: "Corgi",
        39: "Chó sói 🐺",
        40: "Vịt Donald 🦆",
        41: "Gà rán 🍗",
        42: "Gấu Pooh 🐻",
        43: "Su kem 🥧",
        44: "Bạch tuộc Paul 🐙",
        45: "Cú đêm 😪",
        46: "Bò viên 🍖",
        47: "Quá đẹp trai",
        48: "Sư tử 🦁",
        49: "Mèo Kitty 🐱",
        50: "Gà tây 🦃",
        51: "Trái dứa 🍍",
        52: "Bánh tráng trộn 😮",
        53: "Ê 😗",
        54: "Ngang như cua 🦀",
        55: "Bug đầy đầu 😥",
        56: "Full sờ tách 😎",
        57: "Coder 🫠",
        58: "Pate 🍔",
        59: "Cái tên 🫡",
        60: "Ủa 🤔",
        61: "U là trời 😩",
        62: "Bún đậu mắm tôm 🫥",
        63: "J dị ❓",
        64: "Tắt mic đê 😠",
        65: "Bật cam coai 🥶",
        66: "Bật cam roài 🫡",
        67: "Hiệp sĩ 🤡",
        68: "Tokboki",
        69: "Đi ăn hong 😀",
        70: "Đói bụng quá 😩",
        71: "BUG",
        72: "Xà lơ",
        73: "Rich kid",
        74: "SOS",
        75: "Chai lăn nách",
        76: "Vim bồn cầu 🦆",
        77: "Cô cô nớt 🥥",
    };

    const randomNickname = (number: number) => {
        return nicknames[number] || "user";
    };

    const [nickname, setNickname] = React.useState<string>("");

    React.useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 74) + 1;
        setNickname(randomNickname(randomNumber));
    }, []);

    return nickname;
};
