import React from "react"
import Carousel from "r-components/carousel"

export default function CarouselExample() {
    return (
        <Carousel indicators>
            <Carousel.Item caption={
                <>
                    <h5>First slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                </>
            }
            interval={5000}>
                <svg
                    width="800"
                    height="400"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="indigo"></rect>
                    <text x="50%" y="50%" fill="#fff" dy=".3em">First slide</text>
                </svg>
            </Carousel.Item>
            1
            <Carousel.Item interval={6000}>
                <svg
                    width="800"
                    height="400"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="royalblue"></rect>
                    <text x="50%" y="50%" fill="#fff" dy=".3em">Second slide</text>
                </svg>
            </Carousel.Item>
            <div>123</div>
            <Carousel.Item interval={8000}>
                <svg
                    width="800"
                    height="400"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false">
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="coral"></rect>
                    <text x="50%" y="50%" fill="#fff" dy=".3em">Third slide</text>
                </svg>
            </Carousel.Item>
        </Carousel>
    )
}