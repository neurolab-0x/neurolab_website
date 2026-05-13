import React, { useState, useEffect } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import Prism from 'prismjs';

// Import Prism languages
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
    className?: string;
}

const CodeBlock = ({ code, language = 'javascript', title, className }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        Prism.highlightAll();
    }, [code, language]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    return (
        <div className={cn("group relative my-6 overflow-hidden rounded-xl border border-slate-800 bg-[#0B0F1A] shadow-2xl", className)}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-4 py-2">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-slate-500" />
                        <span className="text-[12px] font-medium text-slate-400">
                            {title || (language === 'bash' ? 'Terminal' : 'Code')}
                        </span>
                    </div>
                </div>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 rounded-md bg-white/[0.05] px-2.5 py-1 text-[11px] font-medium text-slate-400 transition-all hover:bg-white/[0.1] hover:text-white"
                >
                    {copied ? (
                        <>
                            <Check size={14} className="text-emerald-400" />
                            <span>Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy size={14} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            {/* Code Body */}
            <div className="relative">
                <pre className={cn("line-numbers p-4 py-5 text-[13px] leading-relaxed overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10", `language-${language}`)}>
                    <code className={`language-${language}`}>
                        {code.trim()}
                    </code>
                </pre>
            </div>

            {/* CSS for Prism (Inline to ensure it works without extra setup) */}
            <style dangerouslySetInnerHTML={{ __html: `
                code[class*="language-"], pre[class*="language-"] { color: #ccc; background: none; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; text-align: left; white-space: pre; word-spacing: normal; word-break: normal; word-wrap: normal; line-height: 1.5; tab-size: 4; hyphens: none; }
                .token.comment, .token.prolog, .token.doctype, .token.cdata { color: #636f88; }
                .token.punctuation { color: #818cf8; }
                .token.namespace { opacity: .7; }
                .token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.deleted { color: #f472b6; }
                .token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted { color: #34d399; }
                .token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string { color: #818cf8; }
                .token.atrule, .token.attr-value, .token.keyword { color: #60a5fa; }
                .token.function, .token.class-name { color: #f472b6; }
                .token.regex, .token.important, .token.variable { color: #fbbf24; }
                .token.important, .token.bold { font-weight: bold; }
                .token.italic { font-style: italic; }
            `}} />
        </div>
    );
};

export default CodeBlock;
