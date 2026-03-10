-- CreateTable
CREATE TABLE "layout_items" (
    "uuid" TEXT NOT NULL,
    "layoutId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isBookable" BOOLEAN NOT NULL DEFAULT false,
    "bookingTypeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "layout_items_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "booking_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "booking_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "layout_items_layoutId_name_key" ON "layout_items"("layoutId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "booking_types_name_key" ON "booking_types"("name");

-- AddForeignKey
ALTER TABLE "layout_items" ADD CONSTRAINT "layout_items_layoutId_fkey" FOREIGN KEY ("layoutId") REFERENCES "layouts"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "layout_items" ADD CONSTRAINT "layout_items_bookingTypeId_fkey" FOREIGN KEY ("bookingTypeId") REFERENCES "booking_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;
