import {Stack} from "@mui/material";

import HeroSection from "@/components/Landing/HeroSection";
import TrendingSection from "@/components/Landing/TrendingSection";
import MostViewedSection from "@/components/Landing/MostViewedSection";
import SearchSection from "@/components/Landing/SearchSection";
import FindVisionSection from "@/components/Landing/FindVisionSection";
import ReviewsSection from "@/components/Landing/ReviewsSection";
import DiscoverSection from "@/components/Landing/DiscoverSection";

const Landing = () => {
    return (
        <Stack
            spacing={0}
            direction="column"
            sx={{
                maxWidth: "1200px",
            }}
        >
            <HeroSection />
            <TrendingSection />
            <MostViewedSection />
            <SearchSection />
            <FindVisionSection />
            <ReviewsSection />
            <DiscoverSection />
        </Stack>
    )
}

export default Landing;