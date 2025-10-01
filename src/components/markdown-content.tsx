// "use client";

import { useEffect, useRef } from "react";
// import Image from "next/image";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Find all img tags in the rendered markdown
    const images = contentRef.current.querySelectorAll("img");
    
    images.forEach((img) => {
      // Get the src attribute
      const src = img.getAttribute("src");
      if (!src) return;
      
      // Create a wrapper div for the Next.js Image component
      const wrapper = document.createElement("div");
      wrapper.className = "relative w-full my-4";
      
      // Create the Next.js Image component
      const nextImage = document.createElement("img");
      nextImage.src = src;
      nextImage.alt = img.alt || "";
      nextImage.className = "w-full h-auto rounded-lg";
      
      // Replace the original img with the wrapper
      wrapper.appendChild(nextImage);
      img.parentNode?.replaceChild(wrapper, img);
    });

    // Process code blocks to add language display
    const codeBlocks = contentRef.current.querySelectorAll("pre[class*='language-']");
    codeBlocks.forEach((pre) => {
      const classList = pre.className.split(" ");
      const languageClass = classList.find(c => c.startsWith("language-"));
      
      if (languageClass) {
        const language = languageClass.replace("language-", "");
        pre.setAttribute("data-language", language);
      }
    });
  }, [content]);

  return (
    <div 
      ref={contentRef}
      className={`prose prose-green lg:prose-lg dark:prose-invert mx-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
} 