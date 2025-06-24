import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DynamicFontAwesomeIcon } from '../../lib/DynamicFontAwesomeIcon';
import Link from 'next/link';

const platformIcons = {
  facebook: ['fab', 'facebook-f'],
  twitter: ['fab', 'twitter'],
  linkedin: ['fab', 'linkedin-in'],
  instagram: ['fab', 'instagram'],
  youtube: ['fab', 'youtube'],
};

export default function SocialIcons({ links = [] }) {
  return (
    <div className="flex gap-4">
      {links.map((link, index) => {
        const icon = platformIcons[link.platform?.toLowerCase()];
        if (!icon || !link.url) return null;

        return (
          <>
          <Link key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl text-gray-400 hover:text-gray-500 transition" ><DynamicFontAwesomeIcon icon={icon} />
          </Link>
        
          </>
          
        );
      })}
    </div>
  );
}