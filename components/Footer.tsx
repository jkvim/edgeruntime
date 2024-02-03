import { useRouter } from "next/router";
import { FullScreenRoutes } from "@/constants/route-config";

export const Footer = () => {
  const {route} = useRouter();
  if (FullScreenRoutes.includes(route)) {
    return null
  }

  return (
    <footer
      className="footer footer-center p-8 text-base-content gap-y-4 bg-base-100 mt-20">
      <aside>
        <p>Copyright © 2024 - Edgeruntime.ai</p>
      </aside>
    </footer>
  );
};
