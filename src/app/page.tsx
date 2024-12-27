"use client";
import AddBtn from "@/components/AddBtn";
import { arrayAtomFamily, booleanDefaultTrueAtomFamily } from "@/recoil/atom";
import { atomKey } from "@/recoil/atom-key";
import ContentBuilder from "@innovastudio/contentbuilder";
import { Fragment, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ContentBuilderEditor from "./ContentBuilderEditor";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [editor, setEditor] = useRecoilState(
    arrayAtomFamily(atomKey.editorContainer)
  );
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const observerRef = useRef<any>(null);

  const isRemountEditor = useRecoilValue(
    booleanDefaultTrueAtomFamily(atomKey.isRemountEditor)
  );
  const buidlerRef = useRef<any>(null);
  const [builderInstance, setBuilderInstance] = useState<any>(null);

  useEffect(() => {
    const builder = new ContentBuilder({
      container: ".pb-editor",
      assetPath: "./contentbuilderbase/assets/",
      modulePath: "./contentbuilderbase/assets/modules/",
      fontPath: "./contentbuilderbase/assets/fonts/",
      snippetUrl: "./contentbuilderbase/assets/minimalist-blocks/content.js",
      snippetPath: "./contentbuilderbase/assets/minimalist-blocks/",
      pluginPath: "./contentbuilderbase/contentbuilder/",
      snippetPathReplace: [
        "/static/contentbuilder/assets/minimalist-blocks/",
        "/contentbuilderbase/assets/minimalist-blocks/",
      ],

      sendCommandUrl: "/api/generate",

      // framework: "tailwind",
      clearPreferences: true,
      zoom: 1,
      toolbar: "right",

      // Explicitly define toolbar buttons to ensure they're available
      buttons: [
        "bold",
        "italic",
        "underline",
        "formatting",
        "color",
        "align",
        "textsettings",
        "createlink",
        "tags",
        "|",
        "undo",
        "redo",
        "zoom",
        "aiassistant",
        "more",
      ],
      buttonsMore: [
        "icon",
        "image",
        "|",
        "list",
        "font",
        "formatpara",
        "|",
        "html",
        "preferences",
      ],
      plugins: [
        {
          name: "preview",
          showInMainToolbar: true,
          showInElementToolbar: true,
        },
        {
          name: "wordcount",
          showInMainToolbar: true,
          showInElementToolbar: true,
        },
        {
          name: "symbols",
          showInMainToolbar: true,
          showInElementToolbar: false,
        },
      ],

      onChange: function () {
        const selectedElement = document.querySelector(
          `.builder-wrapper.editor-focus`
        ) as HTMLElement;
        const editorEle = selectedElement?.querySelector(
          ".pb-editor"
        ) as HTMLElement;

        console.log({ selectedElement, editorEle });

        const selectedElementSectionId = editorEle?.dataset?.sectionId;

        const updatedHtml = builder.html(editorEle as HTMLElement);
        console.log("change", {
          selectedElement,
          selectedElementSectionId,
          updatedHtml,
        });
        setEditor((curr: any) => {
          console.log({ curr });
          return curr.map((item: any) => {
            if (item.id === selectedElementSectionId) {
              return {
                ...item,
                html: updatedHtml,
              };
            }
            return item;
          });
        });
      },

      customTags: [
        ["Site Name", "{%SITENAME%}"],
        ["Logo", "{%LOGO%}"],
        ["My Plugin", "{%MY_PLUGIN%}"],
      ],

      snippetCategories: [
        [104, "Products"],
        [105, "Features"],
        [103, "Team"],
        [102, "Photos"],
        [106, "Project Phases"],
        [107, "Pricing"],
        [110, "Testimonials"],

        [120, "Basic"],
        [101, "Headline"],
        [118, "Article"],
        [108, "Skills"],
        [116, "Contact"],
        [109, "Achievements"],
        [111, "Partners"],
        [112, "As Featured On"],
        [119, "Buttons"],
        [113, "Page Not Found"],
        [114, "Coming Soon"],
        [115, "Help, FAQ"],
        [150, "New Added"],
      ],
      defaultSnippetCategory: 104,
    });

    // buidlerRef.current = builder;
    setBuilderInstance(builder);

    // Cleanup function
    return () => {
      if (builder) {
        builder.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!isRemountEditor || !editor.length) return;

    const options = {
      root: null,
      rootMargin: "-50% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("data-section-id");
          setActiveSectionId(sectionId);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);

    // Observe all sections
    const sections = document.querySelectorAll(".builder-wrapper");
    sections.forEach((section) => {
      observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isRemountEditor, editor.length]);

  const handleSectionClick = (sectionId) => {
    // Find the section element
    const sectionElement = document.querySelector(
      `.builder-wrapper[data-section-id="${sectionId}"]`
    );
    if (sectionElement) {
      // Get the header height (if you have a fixed header)
      const headerHeight = 0; // Adjust this value if you have a fixed header

      // Calculate the element's position relative to the viewport
      const elementPosition = sectionElement.getBoundingClientRect().top;
      // Calculate the current scroll position
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      // Smooth scroll to the element
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveSectionId(sectionId);
    }
  };

  return (
    <div className="flex">
      <Sidebar
        editor={editor}
        isOpen={isSidebarOpen}
        onToggle={() => setSidebarOpen(!isSidebarOpen)}
        activeSection={activeSectionId}
        onSectionClick={handleSectionClick}
      />

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="container max-w-4xl mx-auto min-h-screen p-8">
          {isRemountEditor && builderInstance !== null && (
            <div className="space-y-8">
              {editor.map((data, index) => (
                <Fragment key={index}>
                  <ContentBuilderEditor
                    key={index}
                    data={data}
                    index={index}
                    builderInstance={builderInstance}
                  />
                  <AddBtn
                    prevSectionInd={editor.length - 1 === index ? null : index}
                    builderInstance={builderInstance}
                  />
                </Fragment>
              ))}
            </div>
          )}
          {editor.length === 0 && builderInstance !== null && (
            <AddBtn prevSectionInd={null} builderInstance={builderInstance} />
          )}
        </div>
      </div>
    </div>
  );
}
