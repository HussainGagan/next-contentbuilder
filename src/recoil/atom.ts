import { atomFamily } from "recoil";

export const booleanDefaultFalseAtomFamily = atomFamily({
  key: "booleanDefaultFalseAtomFamily",
  default: false,
});

export const booleanDefaultTrueAtomFamily = atomFamily({
  key: "booleanDefaultTrueAtomFamily",
  default: true,
});

export const stringAtomFamily = atomFamily({
  key: "stringAtomFamily",
  default: "",
});

export const objectAtomFamily = atomFamily({
  key: "objectAtomFamily",
  default: {},
});

export const arrayAtomFamily = atomFamily({
  key: "arrayAtomFamily",
  default: [
    // {
    //   id: crypto.randomUUID(),
    //   sectionName: "Section 1",
    //   className: `pb-editor-${crypto.randomUUID()}`,
    //   html: `<div className="row"><div className="column full"><p>This is row 1</p></div></div>`,
    // },
    // {
    //   id: crypto.randomUUID(),
    //   sectionName: "Section 2",
    //   className: `pb-editor-${crypto.randomUUID()}`,
    //   html: `<div className="row"><div className="column full"><p>This is row 2</p></div></div>`,
    // },
  ],
});

export const numberAtomFamily = atomFamily({
  key: "numberAtomFamily",
  default: 0,
});
