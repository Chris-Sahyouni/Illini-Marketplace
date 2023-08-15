import { ItemType } from "@/src/lib/maps";
import { prisma } from "../../../lib/db";

export async function POST(request: Request) {
    const { shouldSave, type, userId, itemId } = await request.json();
    try {
        if (shouldSave) {
            switch (type) {
                case ItemType.Sublease: {
                    await prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            SubleaseSaved: {
                                connect: {id: itemId}
                            }
                        }
                    })
                    break;
                }
                case ItemType.Textbook: {
                    console.log("this route");
                    await prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            TextbookSaved: {
                                connect: {id: itemId}
                            }
                        }
                    })
                    break;
                }
                case ItemType.Transit: {
                    await prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            TransitSaved: {
                                connect: {id: itemId}
                            }
                        }
                    })
                    break;
                }
                case ItemType.Ticket: {
                    await prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            TicketSaved: {
                                connect: {id: itemId}
                            }
                        }
                    })
                    break;
                }
                case ItemType.Parking: {
                    await prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            ParkingSaved: {
                                connect: {id: itemId}
                            }
                        }
                    })
                    break;
                }
                case ItemType.Misc: {
                    await prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            MiscSaved: {
                                connect: {id: itemId}
                            }
                        }
                    })
                    break;
                }
            }
        } else {
            switch (type) {
                case ItemType.Sublease: {
                    await prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            SubleaseSaved: {
                                disconnect: {id: itemId}
                            }
                        }
                    })
                    break;
                }
                case ItemType.Textbook: {
                    await prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            TextbookSaved: {
                                disconnect: {id: itemId}
                            }
                        }
                    })
                    break;
                }
                case ItemType.Transit: {
                    await prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            TransitSaved: {
                                disconnect: {id: itemId}
                            }
                        }
                    })
                    break;
                }
                case ItemType.Ticket: {
                    await prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            TicketSaved: {
                                disconnect: {id: itemId}
                            }
                        }
                    })
                    break;
                }
                case ItemType.Parking: {
                    await prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            ParkingSaved: {
                                disconnect: {id: itemId}
                            }
                        }
                    })
                    break;
                }
                case ItemType.Misc: {
                    await prisma.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            MiscSaved: {
                                disconnect: {id: itemId}
                            }
                        }
                    })
                    break;
                }
            }
        }
        return new Response(JSON.stringify({success: true}), {status: 200});
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({success: false}), {status: 500})
    }
}