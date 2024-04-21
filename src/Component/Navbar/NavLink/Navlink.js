import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavLink = ({ href, icon, title }) => {
  const pathName = usePathname();

  return (
    <Link href={href}>
      <div
        className={`flex items-center justify-center text-white/90 hover:text-gray-300 transition duration-300 relative relative-group`}
      >
        <span className="mr-1">{icon}</span>
        {title}
        {pathName === href && (
          <>
            <motion.div
              className="absolute hidden lg:block bottom-0  left-0 w-full h-[3px] bg-gradient-to-r from-white/70 via-white/60 to-white/45 -mb-1 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9 }}
            />
          </>
        )}
      </div>
    </Link>
  );
};

export default NavLink;
