export interface IHero {
    id: string;
    nickname: string,
    real_name: string,
    origin: string,
    superpowers: string,
    phrase: string,
    images: string[]
}

export interface IHeroSend {
    id?: string;
    nickname: string,
    real_name: string,
    origin: string,
    superpowers: string,
    phrase: string,
    images: File[]
}