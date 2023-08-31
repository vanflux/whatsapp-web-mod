import { CryptographyModule } from "../module";

const syllableRegex = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi;

function syllabify(word: string) {
  return word.match(syllableRegex);
}

function transform(vowel: string) {
  if (vowel.match(/[aou]/i)) {
    if (vowel.toLowerCase() === vowel) {
      return `g${vowel}r${vowel}`;
    } else {
      return `G${vowel}R${vowel}`;
    }
  } else if (vowel.match(/[ei]/i)) {
    if (vowel.toLowerCase() === vowel) {
      return `gu${vowel}r${vowel}`;
    } else {
      return `GU${vowel}R${vowel}`;
    }
  }
}

export const AguaraCryptographyModule: CryptographyModule = {
  name: "Xguxrx",
  apply() {},
  destroy() {},
  canSend() {
    return true;
  },
  async encrypt(_, message) {
    return (
      message
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .match(/[a-z]+|[^a-z]+/gi)
        ?.map((word) => {
          if (!word.trim().length) return word;
          const syllables = syllabify(word);
          if (syllables == null) return word;
          const hasMultiSyllable = syllables.length > 1;
          let encrypted = "";
          for (const syllable of syllables) {
            let foundVowel = false;
            if (hasMultiSyllable) {
              for (let i = syllable.length - 1; i >= 0; i--) {
                const vowel = syllable[i];
                const ret = transform(vowel);
                if (ret) {
                  foundVowel = true;
                  encrypted += syllable + ret;
                  break;
                }
              }
            } else {
              for (let i = 0; i < syllable.length; i++) {
                const vowel = syllable[i];
                const ret = transform(vowel);
                encrypted += vowel;
                if (ret) {
                  foundVowel = true;
                  encrypted += ret;
                }
              }
            }
            if (!foundVowel) encrypted += syllable;
          }
          return encrypted;
        })
        .join("") ?? ""
    );
  },
  async decrypt(chatId, encryptedMessage) {
    return encryptedMessage.replace(/gu?[aeiou]r[aeiou]/gi, "");
  },
  component: () => null,
};
