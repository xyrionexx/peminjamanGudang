"use client";

import type React from "react";

import { useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EnhancedSearchProps {
	placeholder?: string;
	onSearch?: (value: string) => void;
	onReset?: () => void;
	isLoading?: boolean;
	className?: string;
}

export function EnhancedSearch({
	placeholder = "Search for items...",
	onSearch,
	onReset,
	isLoading = false,
	className = "",
}: EnhancedSearchProps) {
	const [searchValue, setSearchValue] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	const handleSearch = () => {
		if (searchValue.trim()) {
			onSearch?.(searchValue.trim());
		}
	};

	const handleReset = () => {
		setSearchValue("");
		onReset?.();
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Enter") {
			handleSearch();
		}
		if (event.key === "Escape") {
			handleReset();
		}
	};

	return (
		<div className={`relative w-full max-w-lg ${className}`}>
			<div
				className={`
          relative flex items-center gap-2 
          bg-white dark:bg-gray-900 
          border-2 rounded-full 
          transition-all duration-200 ease-in-out
          ${
						isFocused
							? "border-gray-500 shadow-lg shadow-gray-500/20 dark:shadow-gray-400/20"
							: "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
					}
        `}>
				{/* Search Icon */}
				<div className='flex items-center justify-center pl-4'>
					{isLoading ? (
						<Loader2 className='h-4 w-4 text-gray-400 animate-spin' />
					) : (
						<Search className='h-4 w-4 text-gray-400' />
					)}
				</div>

				{/* Input Field */}
				<Input
					type='text'
					placeholder={placeholder}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					onKeyDown={handleKeyDown}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					className='
            flex-1 border-0 bg-transparent 
            focus-visible:ring-0 focus-visible:ring-offset-0
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            text-sm
          '
					disabled={isLoading}
				/>

				{/* Clear/Reset Button */}
				{searchValue && (
					<Button
						type='button'
						variant='ghost'
						size='sm'
						onClick={handleReset}
						className='
              h-8 w-8 p-0 mr-1
              hover:bg-gray-100 dark:hover:bg-gray-800
              rounded-full
              transition-colors duration-200
            '
						disabled={isLoading}>
						<X className='h-3 w-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300' />
						<span className='sr-only'>Clear search</span>
					</Button>
				)}

				{/* Search Button */}
				<Button
					type='button'
					onClick={handleSearch}
					disabled={!searchValue.trim() || isLoading}
					className='
            h-8 mr-2 px-4
            bg-gray-600 hover:bg-gray-700 
            dark:bg-gray-500 dark:hover:bg-gray-600
            text-white text-xs font-medium
            rounded-full
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-sm hover:shadow-md
          '>
					Search
				</Button>
			</div>

			{/* Search Suggestions/Recent Searches could go here */}
			{isFocused && searchValue && (
				<div className='absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50'>
					<div className='p-2 text-xs text-gray-500 dark:text-gray-400'>
						Press Enter to search or Escape to clear
					</div>
				</div>
			)}
		</div>
	);
}
