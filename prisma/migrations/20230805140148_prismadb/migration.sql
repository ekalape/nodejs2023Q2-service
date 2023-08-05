-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavsArtist" (
    "artistID" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FavsAlbum" (
    "albumID" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FavsTrack" (
    "trackID" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FavsArtist_artistID_key" ON "FavsArtist"("artistID");

-- CreateIndex
CREATE UNIQUE INDEX "FavsAlbum_albumID_key" ON "FavsAlbum"("albumID");

-- CreateIndex
CREATE UNIQUE INDEX "FavsTrack_trackID_key" ON "FavsTrack"("trackID");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavsArtist" ADD CONSTRAINT "FavsArtist_artistID_fkey" FOREIGN KEY ("artistID") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavsAlbum" ADD CONSTRAINT "FavsAlbum_albumID_fkey" FOREIGN KEY ("albumID") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavsTrack" ADD CONSTRAINT "FavsTrack_trackID_fkey" FOREIGN KEY ("trackID") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
