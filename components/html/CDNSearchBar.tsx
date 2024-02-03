import { useEffect, useState } from "react";
import { useDebounce } from "ahooks";
import toast from "react-hot-toast";
import cn from "classnames";
import { FormControl } from "../FormControl"

type SearchResult = {
  name: string;
  latest: string;
}

export function CDNSearchBar() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, { wait: 300 });
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const searchLib = async () => {
      if (debouncedSearch) {
        fetch("https://api.cdnjs.com/libraries?search=" + debouncedSearch)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setResults(data.results);
          });
      }
    } 

    searchLib()
  }, [debouncedSearch])

  return (
    <FormControl label="Library Search">
      <div className={cn("dropdown")}>
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          tabIndex={0}
          role="button"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {results.length > 0 && (
          <ul
            tabIndex={0}
            className="dropdown-content flex-nowrap menu mt-2 bg-base-200 rounded-box backdrop-blur-sm z-10 max-h-56 overflow-auto"
          >
            {results.map((result) => (
              <li
                className="flex flex-row w-full items-center gap-2 cursor-pointer"
                key={result.name}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  console.log("click");

                  navigator.clipboard.writeText(result.latest);
                  toast.success("Copied to clipboard");
                }}
              >
                <a className="w-full">{result.name}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </FormControl>
  );
}